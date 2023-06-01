package com.sourcery.pablomed.security;


import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

@RequiredArgsConstructor
public class LoggedUserEmailResolver {

    public static String loggedUserEmailResolver() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication instanceof JwtAuthenticationToken) {
            String email = ((JwtAuthenticationToken) authentication).getTokenAttributes().get("https://pablomed.devbstaging.com/user").toString();
            if (email != null) {
                return email;
            }
        }
        return null;
    }
}
