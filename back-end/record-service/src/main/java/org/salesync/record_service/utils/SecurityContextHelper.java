package org.salesync.record_service.utils;

import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityContextHelper {
    public static String getContextUserId() {
        return (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
