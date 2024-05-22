package org.salesync.record_service.utils;

import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityContextHelper {
    public static String getContextUserId() {
        return (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public static List<String> getContextAuthorities() {
        return SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream().map(
                GrantedAuthority::getAuthority).toList();
    }
}
