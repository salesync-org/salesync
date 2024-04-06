package com.salesync.typeservice.services.token;

import io.jsonwebtoken.Claims;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.function.Function;

public interface TokenService {
    public static final String TOKEN_TYPE = "Bearer";
    <T> T extractClaim(String token, Function<Claims, T> claimResolver);
    boolean isExpiredToken(String token);
}
