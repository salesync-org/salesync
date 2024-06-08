package com.salesync.typeservice.services.token;

import java.util.function.Function;

import io.jsonwebtoken.Claims;

public interface TokenService {
	String TOKEN_TYPE = "Bearer";

	<T> T extractClaim(String token, Function<Claims, T> claimResolver);

	boolean isExpiredToken(String token);
}
