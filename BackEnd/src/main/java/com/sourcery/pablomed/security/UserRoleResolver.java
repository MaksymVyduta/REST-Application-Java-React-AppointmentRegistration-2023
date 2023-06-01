package com.sourcery.pablomed.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@Service
@RequiredArgsConstructor
public class UserRoleResolver {

    public static UserRole resolveUserRole() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof JwtAuthenticationToken) {
            String role = ((JwtAuthenticationToken) authentication).getTokenAttributes().get("https://pablomed.devbstaging.com/roles").toString();
            if (role != null) {
                return switch (role) {
                    case "[administrator]" -> UserRole.ADMIN;
                    case "[doctor]" -> UserRole.DOCTOR;
                    default -> UserRole.PATIENT;
                };
            }
        }
        return null;
    }

    public static String getUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return ((JwtAuthenticationToken) authentication).getTokenAttributes().get("https://pablomed.devbstaging.com/user").toString();
    }
}