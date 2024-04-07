package org.salesync.record_service.components;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import java.io.IOException;

@Configuration
public class ExceptionHandler implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {

        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        authException.printStackTrace();
        System.out.println("Unauthorized error: " + authException.getMessage());
        authException.printStackTrace();
        response.getOutputStream().println("{ \"error\": \"" + authException.getMessage() + "\" }");

    }
}
