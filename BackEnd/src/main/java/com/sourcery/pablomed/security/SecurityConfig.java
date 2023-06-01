package com.sourcery.pablomed.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public JwtDecoder jwtDecoder() throws Exception {
        return JwtDecoderFactory.createDecoder("https://dev-agnxwxcor6pa7i6f.us.auth0.com/.well-known/jwks.json");
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors(). and().authorizeRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.GET, "/api/hello")
                        .authenticated()
                        .requestMatchers("/api/v1/appointment")
                        .authenticated())
                .oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt);
        return http.build();
    }
}