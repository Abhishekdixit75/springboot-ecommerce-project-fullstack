package com.ecommerce.project.service;

import com.ecommerce.project.model.Cart;
import com.ecommerce.project.repositories.CartRepository;
import com.ecommerce.project.util.AuthUtil;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CartServiceImplTest {

    @Mock
    private CartRepository cartRepository;

    @Mock
    private AuthUtil authUtil;

    @InjectMocks
    private CartServiceImpl cartService;

    @Test
    void testCreateCartReturnsExistingCart() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        Cart existingCart = new Cart();
        existingCart.setCartId(1L);
        existingCart.setTotalPrice(12.33);

        String email = "pseudoemail@gmail.com";

        when(authUtil.loggedInEmail()).thenReturn(email);
        when(cartRepository.findCartByEmail(authUtil.loggedInEmail())).thenReturn(existingCart);

        // this is 'Reflections'
        Method createCart = CartServiceImpl.class.getDeclaredMethod("createCart");
        createCart.setAccessible(true);  // for giving the access of the private method in here

        // calling the actual method
        Cart createdCart = (Cart) createCart.invoke(cartService);

        // assertions and verifications
        assertNotNull(createdCart);
        assertEquals(existingCart, createdCart);
        verify(cartRepository).findCartByEmail(email);
        verify(cartRepository, never()).save(any(Cart.class));
    }

    @Test
    void testCreateCartReturnsNewCart() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        String email = "pseudoemail@gmail.com";
        Cart cart = new Cart();
        cart.setTotalPrice(0.00);


        when(authUtil.loggedInEmail()).thenReturn(email);
        when(cartRepository.findCartByEmail(authUtil.loggedInEmail())).thenReturn(null);
        when(cartRepository.save(cart)).thenReturn(cart);


        Method createCart = CartServiceImpl.class.getDeclaredMethod("createCart");
        createCart.setAccessible(true);  // for giving the access of the private method

        Cart createdCart = (Cart) createCart.invoke(cartService);

        assertNotNull(createdCart);
        assertEquals(cart.getTotalPrice(), createdCart.getTotalPrice());
        verify(cartRepository, times(1)).findCartByEmail(email);
        verify(cartRepository, times(1)).save(any(Cart.class));
    }
}
