package org.salesync.record_service.services.token;

import io.jsonwebtoken.Claims;

import java.util.function.Function;

public interface TokenService {
    public static final String TOKEN_TYPE = "Bearer";

    <T> T extractClaim(String token, Function<Claims, T> claimResolver);

    boolean isExpiredToken(String token);
}
