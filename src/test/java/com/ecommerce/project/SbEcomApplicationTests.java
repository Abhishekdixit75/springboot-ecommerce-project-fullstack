package com.ecommerce.project;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(properties = {
    "spring.datasource.url=jdbc:h2:mem:testdb",
    "spring.datasource.driverClassName=org.h2.Driver",
    "spring.datasource.username=sa",
    "spring.datasource.password=password",
    "spring.jpa.database-platform=org.hibernate.dialect.H2Dialect",
    "stripe.secret.key=dummy",
    "frontend.url=http://localhost:3000",
    "spring.jpa.hibernate.ddl-auto=create-drop"
})
class SbEcomApplicationTests {

    @Test
    void contextLoads() {}
}
