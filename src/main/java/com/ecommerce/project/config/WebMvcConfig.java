package com.ecommerce.project.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Serve files under the project's images/ directory when requests come to /images/**
        // Use an explicit relative path (./images/) so it resolves from the application's working directory.
        registry.addResourceHandler("/images/**").addResourceLocations("file:./images/");
    }
}