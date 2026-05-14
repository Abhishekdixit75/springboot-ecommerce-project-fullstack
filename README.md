# 🛒 EcomApp — Full Stack E-Commerce Platform

> A full-stack e-commerce application built with Spring Boot and React, featuring layered architecture, JWT authentication, PostgreSQL database, and Swagger API documentation.

![Java](https://img.shields.io/badge/Java-17-orange?style=flat-square)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.4-brightgreen?style=flat-square)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

---

## 📸 Screenshots

![Screenshot 495](./demo_screenshots/Screenshot%20(495).png)
![Screenshot 496](./demo_screenshots/Screenshot%20(496).png)
![Screenshot 497](./demo_screenshots/Screenshot%20(497).png)
![Screenshot 498](./demo_screenshots/Screenshot%20(498).png)
![Screenshot 499](./demo_screenshots/Screenshot%20(499).png)
![Screenshot 500](./demo_screenshots/Screenshot%20(500).png)
![Screenshot 501](./demo_screenshots/Screenshot%20(501).png)
![Screenshot 502](./demo_screenshots/Screenshot%20(502).png)
![Screenshot 503](./demo_screenshots/Screenshot%20(503).png)
![Screenshot 504](./demo_screenshots/Screenshot%20(504).png)
![Screenshot 505](./demo_screenshots/Screenshot%20(505).png)
![Screenshot 506](./demo_screenshots/Screenshot%20(506).png)
![Screenshot 507](./demo_screenshots/Screenshot%20(507).png)
![Screenshot 508](./demo_screenshots/Screenshot%20(508).png)
![Screenshot 509](./demo_screenshots/Screenshot%20(509).png)
![Screenshot 510](./demo_screenshots/Screenshot%20(510).png)
![Screenshot 511](./demo_screenshots/Screenshot%20(511).png)

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Built Features](#built-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Code Quality](#code-quality-linting--formatting)
- [Upcoming Features](#upcoming-features)
- [Configuration](#configuration)

---

## 🎯 Project Overview

This Spring Boot E-Commerce application is designed to provide a comprehensive backend solution for online shopping platforms. It follows industry best practices with a layered architecture (Controller → Service → Repository → Model) and includes security features, error handling, file uploads, and RESTful API endpoints. It is newly expanded with a React frontend!

**Version:** 0.0.1-SNAPSHOT  
**Java Version:** 17  
**Framework:** Spring Boot 3.5.4 & React 18

---

## ✨ Built Features

### 1. **User Authentication & Authorization**
   - JWT (JSON Web Token) based authentication
   - Role-based access control (Admin, User roles)
   - Secure password management
   - Cookie-based session management
   - Authentication endpoints with token generation

### 2. **Product Management**
   - Create, read, update, and delete products
   - Product categorization
   - Product descriptions and details
   - Price management
   - Product search and filtering

### 3. **Category Management**
   - Organize products by categories
   - Category creation and management
   - Category-based product filtering

### 4. **Shopping Cart**
   - Add/remove items from cart
   - Cart item quantity management
   - Calculate total cart value
   - User-specific cart management

### 5. **Order Management**
   - Create and manage customer orders
   - Order tracking with status updates
   - Order items association
   - Order history retrieval

### 6. **User Address Management**
   - Multiple address storage per user
   - Billing and shipping address support
   - Address CRUD operations

### 7. **Payment Information Storage**
   - Payment details model (ready for integration)
   - Payment status tracking

### 8. **File Management**
   - Image upload functionality
   - File storage and retrieval
   - Product image support

### 9. **Global Exception Handling**
   - Custom exception classes
   - Centralized error handling
   - Consistent API error responses
   - Resource not found handling

### 10. **API Documentation**
   - Swagger/Springfox integration
   - Interactive API documentation
   - Endpoint testing interface

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Backend Framework** | Spring Boot 3.5.4 |
| **Frontend Framework** | React 18 (Vite) |
| **Language** | Java 17, JavaScript |
| **Database** | PostgreSQL |
| **ORM** | JPA/Hibernate |
| **API Documentation** | Swagger (Springfox) |
| **Build Tool** | Maven, npm |
| **Authentication** | JWT (JSON Web Tokens) |
| **Testing** | JUnit 5, Spring Boot Test |
| **Code Quality** | Spotless, ESLint, Prettier, Husky |

### Dependencies Included:
- **Backend:** Spring Web, Spring Data JPA, PostgreSQL Driver, Spring Security, JWT Library, Swagger/Springfox, Spring Test.
- **Frontend:** React Router, Axios, TailwindCSS, Material UI.
- **DevOps:** Spotless, ESLint, Prettier, Husky.

---

## 📁 Project Structure

```text
sb-ecom/
├── .gitattributes
├── .gitignore
├── .mvn
│   └── wrapper
│       └── maven-wrapper.properties
├── Dockerfile
├── README.md
├── ecom-frontend
│   ├── .gitignore
│   ├── .husky
│   │   ├── pre-commit
│   │   └── pre-push
│   ├── .prettierrc
│   ├── README.md
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── api
│   │   │   └── api.js
│   │   ├── assets
│   │   │   └── sliders
│   │   │       ├── sofa.png
│   │   │       ├── tshirt.png
│   │   │       └── tv.png
│   │   ├── components
│   │   │   ├── About.jsx
│   │   │   ├── BackDrop.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   ├── UserMenu.jsx
│   │   │   ├── admin
│   │   │   │   ├── AdminLayout.jsx
│   │   │   │   ├── categories
│   │   │   │   │   ├── AddCategoryForm.jsx
│   │   │   │   │   └── Category.jsx
│   │   │   │   ├── dashboard
│   │   │   │   │   ├── Dashboard.jsx
│   │   │   │   │   └── DashboardOverview.jsx
│   │   │   │   ├── orders
│   │   │   │   │   ├── OrderTable.jsx
│   │   │   │   │   ├── Orders.jsx
│   │   │   │   │   └── UpdateOrderForm.jsx
│   │   │   │   ├── products
│   │   │   │   │   ├── AddProductForm.jsx
│   │   │   │   │   ├── AdminProducts.jsx
│   │   │   │   │   └── ImageUploadForm.jsx
│   │   │   │   └── sellers
│   │   │   │       ├── AddSellerForm.jsx
│   │   │   │       └── Sellers.jsx
│   │   │   ├── auth
│   │   │   │   ├── LogIn.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── cart
│   │   │   │   ├── Cart.jsx
│   │   │   │   ├── EmptyCart.jsx
│   │   │   │   ├── ItemContent.jsx
│   │   │   │   └── SetQuantity.jsx
│   │   │   ├── checkout
│   │   │   │   ├── AddAddressForm.jsx
│   │   │   │   ├── AddressInfo.jsx
│   │   │   │   ├── AddressInfoModal.jsx
│   │   │   │   ├── AddressList.jsx
│   │   │   │   ├── Checkout.jsx
│   │   │   │   ├── DeleteModal.jsx
│   │   │   │   ├── OrderSummary.jsx
│   │   │   │   ├── PaymentConfirmation.jsx
│   │   │   │   ├── PaymentForm.jsx
│   │   │   │   ├── PaymentMethod.jsx
│   │   │   │   ├── PaypalPayment.jsx
│   │   │   │   └── StripePayment.jsx
│   │   │   ├── helper
│   │   │   │   └── tableColumn.jsx
│   │   │   ├── home
│   │   │   │   ├── HeroBanner.jsx
│   │   │   │   └── Home.jsx
│   │   │   ├── products
│   │   │   │   ├── Filter.jsx
│   │   │   │   └── Products.jsx
│   │   │   └── shared
│   │   │       ├── CustomSkeleton.jsx
│   │   │       ├── DeleteModal.jsx
│   │   │       ├── ErrorPage.jsx
│   │   │       ├── InputField.jsx
│   │   │       ├── Loader.jsx
│   │   │       ├── Modal.jsx
│   │   │       ├── Navbar.jsx
│   │   │       ├── Paginations.jsx
│   │   │       ├── ProductCard.jsx
│   │   │       ├── ProductViewModal.jsx
│   │   │       ├── SelectTextField.jsx
│   │   │       ├── Sidebar.jsx
│   │   │       ├── Spinners.jsx
│   │   │       └── Status.jsx
│   │   ├── hooks
│   │   │   ├── useCategoryFilter.js
│   │   │   ├── useOrderFilter.js
│   │   │   ├── useProductFilter.js
│   │   │   └── useSellerFilter.js
│   │   ├── index.css
│   │   ├── main.jsx
│   │   ├── store
│   │   │   ├── actions
│   │   │   │   └── index.js
│   │   │   ├── reducers
│   │   │   │   ├── adminReducer.js
│   │   │   │   ├── authReducer.js
│   │   │   │   ├── cartReducer.js
│   │   │   │   ├── errorReducer.js
│   │   │   │   ├── orderReducer.js
│   │   │   │   ├── paymentMethodReducer.js
│   │   │   │   ├── productReducer.js
│   │   │   │   └── sellerReducer.js
│   │   │   └── store.js
│   │   └── utils
│   │       ├── constant.js
│   │       ├── formatPrice.js
│   │       ├── index.js
│   │       └── truncateText.js
│   └── vite.config.js
├── images
├── mvnw
├── mvnw.cmd
├── pom.xml
└── src
    ├── main
    │   ├── java
    │   │   └── com
    │   │       └── ecommerce
    │   │           └── project
    │   │               ├── SbEcomApplication.java
    │   │               ├── config
    │   │               │   ├── AppConfig.java
    │   │               │   ├── AppConstants.java
    │   │               │   ├── SwaggerConfig.java
    │   │               │   └── WebMvcConfig.java
    │   │               ├── controller
    │   │               │   ├── AddressController.java
    │   │               │   ├── AnalyticsController.java
    │   │               │   ├── AuthController.java
    │   │               │   ├── CartController.java
    │   │               │   ├── CategoryController.java
    │   │               │   ├── OrderController.java
    │   │               │   └── ProductController.java
    │   │               ├── exceptions
    │   │               │   ├── APIException.java
    │   │               │   ├── MyGlobalExceptionHandler.java
    │   │               │   └── ResourceNotFoundException.java
    │   │               ├── model
    │   │               │   ├── Address.java
    │   │               │   ├── AppRole.java
    │   │               │   ├── Cart.java
    │   │               │   ├── CartItem.java
    │   │               │   ├── Category.java
    │   │               │   ├── Order.java
    │   │               │   ├── OrderItem.java
    │   │               │   ├── Payment.java
    │   │               │   ├── Product.java
    │   │               │   ├── Role.java
    │   │               │   └── User.java
    │   │               ├── payload
    │   │               │   ├── APIResponse.java
    │   │               │   ├── AddressDTO.java
    │   │               │   ├── AnalyticsResponse.java
    │   │               │   ├── AuthenticationResult.java
    │   │               │   ├── CartDTO.java
    │   │               │   ├── CartItemDTO.java
    │   │               │   ├── CategoryDTO.java
    │   │               │   ├── CategoryResponse.java
    │   │               │   ├── OrderDTO.java
    │   │               │   ├── OrderItemDTO.java
    │   │               │   ├── OrderRequestDTO.java
    │   │               │   ├── OrderResponse.java
    │   │               │   ├── OrderStatusUpdateDto.java
    │   │               │   ├── PaymentDTO.java
    │   │               │   ├── ProductDTO.java
    │   │               │   ├── ProductResponse.java
    │   │               │   ├── StripePaymentDTO.java
    │   │               │   ├── UserDTO.java
    │   │               │   └── UserResponse.java
    │   │               ├── repositories
    │   │               │   ├── AddressRepository.java
    │   │               │   ├── CartItemRepository.java
    │   │               │   ├── CartRepository.java
    │   │               │   ├── CategoryRepository.java
    │   │               │   ├── OrderItemRepository.java
    │   │               │   ├── OrderRepository.java
    │   │               │   ├── PaymentRepository.java
    │   │               │   ├── ProductRepository.java
    │   │               │   ├── RoleRepository.java
    │   │               │   └── UserRepository.java
    │   │               ├── security
    │   │               │   ├── WebConfig.java
    │   │               │   ├── WebSecurityConfig.java
    │   │               │   ├── jwt
    │   │               │   │   ├── AuthEntryPointJwt.java
    │   │               │   │   ├── AuthTokenFilter.java
    │   │               │   │   └── JwtUtils.java
    │   │               │   ├── request
    │   │               │   │   ├── LoginRequest.java
    │   │               │   │   └── SignupRequest.java
    │   │               │   ├── response
    │   │               │   │   ├── MessageResponse.java
    │   │               │   │   └── UserInfoResponse.java
    │   │               │   └── services
    │   │               │       ├── UserDetailServiceImpl.java
    │   │               │       └── UserDetailsImpl.java
    │   │               ├── service
    │   │               │   ├── AddressService.java
    │   │               │   ├── AddressServiceImpl.java
    │   │               │   ├── AnalyticsService.java
    │   │               │   ├── AnalyticsServiceImpl.java
    │   │               │   ├── AuthService.java
    │   │               │   ├── AuthServiceImpl.java
    │   │               │   ├── CartService.java
    │   │               │   ├── CartServiceImpl.java
    │   │               │   ├── CategoryService.java
    │   │               │   ├── CategoryServiceImpl.java
    │   │               │   ├── FileService.java
    │   │               │   ├── FileServiceImpl.java
    │   │               │   ├── OrderService.java
    │   │               │   ├── OrderServiceImpl.java
    │   │               │   ├── ProductService.java
    │   │               │   ├── ProductServiceImpl.java
    │   │               │   ├── ResponseEntityClassTheory.txt
    │   │               │   ├── StripeService.java
    │   │               │   └── StripeServiceImpl.java
    │   │               ├── springboot-feature-structure.md
    │   │               └── util
    │   │                   └── AuthUtil.java
    │   └── resources
    │       └── application.properties
    └── test
        └── java
            └── com
                └── ecommerce
                    └── project
                        ├── SbEcomApplicationTests.java
                        └── service
                            ├── CartServiceImplTest.java
                            └── ProductServiceImplTest.java
```

---

## 🚀 Getting Started

### Prerequisites
- Java 17 or higher
- Node.js 18+
- PostgreSQL database
- Maven 3.6+

### 1. Clone the repository
```bash
git clone <repository-url>
cd sb-ecom
```

### 2. Configure the database

Edit `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce
spring.datasource.username=postgres
spring.datasource.password=***
```

### 3. Build & Run the Backend
```bash
mvn clean install
./mvnw spring-boot:run
```
- API Base URL: `http://localhost:8080`
- Swagger Documentation: `http://localhost:8080/swagger-ui.html`

### 4. Setup Frontend
```bash
cd ecom-frontend
npm install
npm run dev
```
App will be running at `http://localhost:5173`

---

## 📡 API Endpoints

### Authentication & Users
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/signin` - User login (returns JWT token)
- `POST /api/auth/signout` - User logout
- `GET /api/auth/user` - Get current logged-in user details
- `GET /api/auth/username` - Get current logged-in username
- `GET /api/auth/sellers` - Get list of sellers

### Products
**Public:**
- `GET /api/public/products` - Get all products with pagination & sorting
- `GET /api/public/categories/{categoryId}/products` - Get products by category
- `GET /api/public/products/keyword/{keyword}` - Search products by keyword

**Admin:**
- `GET /api/admin/products` - Get all products
- `POST /api/admin/categories/{categoryId}/product` - Create new product
- `PUT /api/admin/products/{productId}` - Update product
- `DELETE /api/admin/products/{productId}` - Delete product
- `PUT /api/admin/products/{productId}/image` - Update product image

**Seller:**
- `GET /api/seller/products` - Get seller's products
- `POST /api/seller/categories/{categoryId}/product` - Create product as seller
- `PUT /api/seller/products/{productId}` - Update seller's product
- `DELETE /api/seller/products/{productId}` - Delete seller's product
- `PUT /api/seller/products/{productId}/image` - Update product image

### Categories
- `GET /api/public/categories` - Get all categories
- `POST /api/admin/categories` - Create category (Admin)
- `PUT /api/admin/categories/{categoryId}` - Update category (Admin)
- `DELETE /api/admin/categories/{categoryId}` - Delete category (Admin)

### Shopping Cart
- `GET /api/carts` - Get all carts (Admin)
- `GET /api/carts/users/cart` - Get current user's cart
- `POST /api/carts/create` - Create a new cart
- `POST /api/carts/products/{productId}/quantity/{quantity}` - Add item to cart
- `PUT /api/cart/products/{productId}/quantity/{operation}` - Update cart item quantity
- `DELETE /api/carts/{cartId}/product/{productId}` - Remove item from cart

### Orders & Payments
- `POST /api/order/users/payments/{paymentMethod}` - Place an order using a specific payment method
- `POST /api/order/stripe-client-secret` - Create Stripe Payment Intent
- `GET /api/admin/orders` - Get all orders (Admin)
- `GET /api/seller/orders` - Get seller's orders
- `PUT /api/admin/orders/{orderId}/status` - Update order status (Admin)
- `PUT /api/seller/orders/{orderId}/status` - Update order status (Seller)

### User Addresses
- `POST /api/addresses` - Add new address
- `GET /api/addresses` - Get all addresses in the system (Admin)
- `GET /api/users/addresses` - Get current user's addresses
- `GET /api/addresses/{addressId}` - Get specific address by ID
- `PUT /api/addresses/{addressId}` - Update address
- `DELETE /api/addresses/{addressId}` - Delete address

### Analytics
- `GET /api/admin/app/analytics` - Get app analytics data (Admin)

---

## 🛠️ Code Quality (Linting & Formatting)

This project uses automated tools to ensure consistent code styling across both the Backend and Frontend. These checks run automatically before you commit or push using **Husky** Git Hooks.

### ☕ Backend Commands (Spring Boot)
We use **Spotless** to strictly enforce a 4-space indent (AOSP style). Run these commands from the root directory (`sb-ecom/`):

```bash
# Auto-format all Java files and fix indentation
./mvnw spotless:apply

# Check if any files have formatting errors (used in CI/CD)
./mvnw spotless:check
```

### 📦 Frontend Commands (React)
We use **ESLint** to catch errors and **Prettier** for formatting. Run these commands from inside the `ecom-frontend/` directory:

```bash
cd ecom-frontend

# Auto-fix all linting errors and format all files
npm run fix

# If you only want to format without linting
npm run format

# If you only want to see linting errors without fixing
npm run lint
```

---

## 🔮 Upcoming Features

- Product reviews and ratings
- Wishlist functionality
- Email notifications
- SMS notifications
- Product recommendations
- User account management dashboard
- Order tracking updates
- Multi-language support
- Analytics and reporting

---

## ⚙️ Configuration

### JWT Configuration
Located in `application.properties`:
```properties
spring.app.jwtSecret=***
spring.app.jwtExpirationMs=3000000
spring.ecom.app.jwtCookieName=springBootEcom
```

### Database Configuration
Supports both MySQL and PostgreSQL:
```properties
# PostgreSQL (Current)
spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce
spring.datasource.username=postgres
spring.datasource.password=***
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect

# MySQL (Alternative)
# spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce
# spring.datasource.username=root
# spring.datasource.password=***
# spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
```

### Hibernate Configuration
```properties
spring.jpa.hibernate.ddl-auto=update  # Auto-update database schema
spring.jpa.show-sql=false              # Log SQL queries
spring.jpa.properties.hibernate.format_sql=true
```

### File Upload Configuration
```properties
project.image=images/  # Image storage directory
```

---

## 🔒 Security

- **JWT Authentication:** Stateless authentication using JSON Web Tokens
- **Role-Based Access Control:** Different permissions for Admin and User roles
- **Password Security:** Encrypted password storage
- **CORS Configuration:** Configurable cross-origin requests
- **Exception Handling:** Global error handling with consistent responses

---

## 🧪 Testing

Run tests using Maven:
```bash
mvn test
```

Test classes are located in `src/test/java/com/ecommerce/project/`

---

## 📝 Notes

- This is a backend API. Frontend integration will be needed for complete e-commerce experience.
- Database schema is automatically created/updated using Hibernate's `ddl-auto` feature.
- For production deployment, ensure sensitive configuration (JWT secret, DB credentials) is moved to environment variables.

---

## 📄 License

This project is provided as-is for educational and commercial use.

---
