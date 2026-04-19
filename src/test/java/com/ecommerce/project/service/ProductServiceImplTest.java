package com.ecommerce.project.service;

import com.ecommerce.project.exceptions.APIException;
import com.ecommerce.project.exceptions.ResourceNotFoundException;
import com.ecommerce.project.model.Category;
import com.ecommerce.project.model.Product;
import com.ecommerce.project.payload.ProductDTO;
import com.ecommerce.project.repositories.CartRepository;
import com.ecommerce.project.repositories.CategoryRepository;
import com.ecommerce.project.repositories.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
class ProductServiceImplTest {

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private ProductRepository productRepository;

    @Mock
    private CartRepository cartRepository;

    @Mock
    private ModelMapper modelMapper;

    @Mock
    private FileService fileService;

    @InjectMocks
    private ProductServiceImpl productService;

    private Category category;
    private Product product;
    private ProductDTO productDTO;

    @BeforeEach
    void setUp() {
        // Initialize test data
        category = new Category();
        category.setCategoryId(1L);
        category.setCategoryName("Electronics");
        category.setProducts(new ArrayList<>());

        product = new Product();
        product.setProductId(1L);
        product.setProductName("Laptop");
        product.setDescription("High-performance laptop");
        product.setPrice(50000);
        product.setDiscount(10);
        product.setQuantity(100);
        product.setCategory(category);

        productDTO = new ProductDTO();
        productDTO.setProductName("Laptop");
        productDTO.setDescription("High-performance laptop");
        productDTO.setPrice(50000);
        productDTO.setDiscount(10);
        productDTO.setQuantity(100);
    }

    @Test
    void testAddProductSuccess() {
        // Arrange
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
        when(modelMapper.map(productDTO, Product.class)).thenReturn(product);
        when(productRepository.save(any(Product.class))).thenReturn(product);
        when(modelMapper.map(product, ProductDTO.class)).thenReturn(productDTO);

        // Act
        ProductDTO result = productService.addProduct(1L, productDTO);

        // Assert
        assertNotNull(result);
        assertEquals("Laptop", result.getProductName());
        assertEquals("High-performance laptop", result.getDescription());
        assertEquals(50000, result.getPrice());
        assertEquals(10, result.getDiscount());

        // Verify interactions
        verify(categoryRepository, times(1)).findById(1L);
        verify(modelMapper, times(1)).map(productDTO, Product.class);
        verify(productRepository, times(1)).save(any(Product.class));
        verify(modelMapper, times(1)).map(product, ProductDTO.class);
    }

    @Test
    void testAddProductWithSpecialPriceCalculation() {
        // Arrange
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
        when(modelMapper.map(productDTO, Product.class)).thenReturn(product);
        when(productRepository.save(any(Product.class))).thenReturn(product);
        when(modelMapper.map(product, ProductDTO.class)).thenReturn(productDTO);

        // Act
        ProductDTO result = productService.addProduct(1L, productDTO);

        // Assert
        assertNotNull(result);
        // Special Price = 50000 - (10% of 50000) = 50000 - 5000 = 45000
        double expectedSpecialPrice = 50000 - ((10 * 0.01) * 50000);
        verify(productRepository).save(argThat(p -> p.getSpecialPrice() == expectedSpecialPrice));
    }

    @Test
    void testAddProductImageIsSetToDefault() {
        // Arrange
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
        when(modelMapper.map(productDTO, Product.class)).thenReturn(product);
        when(productRepository.save(any(Product.class))).thenReturn(product);
        when(modelMapper.map(product, ProductDTO.class)).thenReturn(productDTO);

        // Act
        productService.addProduct(1L, productDTO);

        // Assert
        verify(productRepository).save(argThat(p -> "default".equals(p.getImage())));
    }

    @Test
    void testAddProductCategoryNotFound() {
        // Arrange
        when(categoryRepository.findById(anyLong())).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> {
            productService.addProduct(999L, productDTO);
        });

        verify(categoryRepository, times(1)).findById(999L);
        verify(productRepository, never()).save(any(Product.class));
    }

    @Test
    void testAddProductAlreadyExists() {
        // Arrange
        Product existingProduct = new Product();
        existingProduct.setProductId(1L);
        existingProduct.setProductName("Laptop");
        existingProduct.setDescription("Existing laptop");
        existingProduct.setPrice(45000);
        existingProduct.setDiscount(5);
        existingProduct.setCategory(category);

        category.setProducts(List.of(existingProduct));

        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));

        // Act & Assert
        assertThrows(APIException.class, () -> {
            productService.addProduct(1L, productDTO);
        }, "Product already exists.");

        verify(categoryRepository, times(1)).findById(1L);
        verify(productRepository, never()).save(any(Product.class));
    }

    @Test
    void testAddProductWithEmptyCategoryProducts() {
        // Arrange
        category.setProducts(new ArrayList<>());
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
        when(modelMapper.map(productDTO, Product.class)).thenReturn(product);
        when(productRepository.save(any(Product.class))).thenReturn(product);
        when(modelMapper.map(product, ProductDTO.class)).thenReturn(productDTO);

        // Act
        ProductDTO result = productService.addProduct(1L, productDTO);

        // Assert
        assertNotNull(result);
        assertEquals("Laptop", result.getProductName());
        verify(productRepository, times(1)).save(any(Product.class));
    }

    @Test
    void testAddProductCategoryIsAssignedToProduct() {
        // Arrange
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
        when(modelMapper.map(productDTO, Product.class)).thenReturn(product);
        when(productRepository.save(any(Product.class))).thenReturn(product);
        when(modelMapper.map(product, ProductDTO.class)).thenReturn(productDTO);

        // Act
        productService.addProduct(1L, productDTO);

        // Assert
        verify(productRepository).save(argThat(p -> p.getCategory().equals(category)));
    }

    @Test
    void testAddProductMultipleProductsInCategory() {
        // Arrange
        Product product2 = new Product();
        product2.setProductId(2L);
        product2.setProductName("Mouse");
        product2.setDescription("Wireless mouse");
        product2.setPrice(500);
        product2.setCategory(category);

        category.setProducts(List.of(product2));

        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
        when(modelMapper.map(productDTO, Product.class)).thenReturn(product);
        when(productRepository.save(any(Product.class))).thenReturn(product);
        when(modelMapper.map(product, ProductDTO.class)).thenReturn(productDTO);

        // Act
        ProductDTO result = productService.addProduct(1L, productDTO);

        // Assert
        assertNotNull(result);
        assertEquals("Laptop", result.getProductName());
        verify(productRepository, times(1)).save(any(Product.class));
    }

    @Test
    void testAddProductWithZeroDiscount() {
        // Arrange
        productDTO.setDiscount(0);
        product.setDiscount(0);

        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
        when(modelMapper.map(productDTO, Product.class)).thenReturn(product);
        when(productRepository.save(any(Product.class))).thenReturn(product);
        when(modelMapper.map(product, ProductDTO.class)).thenReturn(productDTO);

        // Act
        ProductDTO result = productService.addProduct(1L, productDTO);

        // Assert
        assertNotNull(result);
        // Special Price = 50000 - (0% of 50000) = 50000
        verify(productRepository).save(argThat(p -> p.getSpecialPrice() == 50000));
    }

    @Test
    void testAddProductWithMaxDiscount() {
        // Arrange
        productDTO.setDiscount(100);
        product.setDiscount(100);

        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
        when(modelMapper.map(productDTO, Product.class)).thenReturn(product);
        when(productRepository.save(any(Product.class))).thenReturn(product);
        when(modelMapper.map(product, ProductDTO.class)).thenReturn(productDTO);

        // Act
        ProductDTO result = productService.addProduct(1L, productDTO);

        // Assert
        assertNotNull(result);
        // Special Price = 50000 - (100% of 50000) = 0
        verify(productRepository).save(argThat(p -> p.getSpecialPrice() == 0));
    }
}