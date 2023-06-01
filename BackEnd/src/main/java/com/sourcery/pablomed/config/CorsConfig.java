package com.sourcery.pablomed.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/v1/**")
                .allowedOrigins("http://localhost:3000", "https://pablomed.devbstaging.com", "https://dev-agnxwxcor6pa7i6f.us.auth0.com/")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .exposedHeaders("content-type", "authorization")
                .allowCredentials(false)
                .maxAge(3600);
    }
}
