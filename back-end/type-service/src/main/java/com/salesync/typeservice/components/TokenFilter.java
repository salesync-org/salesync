package com.salesync.typeservice.components;

import com.salesync.typeservice.services.token.TokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class TokenFilter extends OncePerRequestFilter {
    private static final String PERMISSIONS = "permissions";
    private static final String USER_ID = "userId";
    private final TokenService tokenService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
            if (authHeader == null || !authHeader.startsWith(TokenService.TOKEN_TYPE)) {
                filterChain.doFilter(request, response);
                return;
            }
            String token = authHeader.substring(TokenService.TOKEN_TYPE.length() + 1);
            String userId = tokenService.extractClaim(token, claims -> claims.get(USER_ID, String.class));
            if (!token.isEmpty()) {
                if (tokenService.isExpiredToken(token)) {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    return;
                }
                List<String> permisstions = tokenService.extractClaim(token, claims -> {
                    return claims.get(PERMISSIONS, (Class<List<String>>) ((Class) List.class));
                });

                PreAuthenticatedAuthenticationToken authentication = new PreAuthenticatedAuthenticationToken(userId, null,
                        permisstions.stream().map(SimpleGrantedAuthority::new).toList());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
            filterChain.doFilter(request, response);
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }

    }
}
