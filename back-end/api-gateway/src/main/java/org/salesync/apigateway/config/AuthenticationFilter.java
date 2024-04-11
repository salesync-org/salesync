package org.salesync.apigateway.config;

import lombok.RequiredArgsConstructor;
import org.salesync.apigateway.dtos.TokenDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.support.ServerWebExchangeUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.text.MessageFormat;
import java.util.Map;

@RefreshScope
@Configuration
@RequiredArgsConstructor
public class AuthenticationFilter implements GatewayFilter {

    @Bean
    public RestTemplateBuilder restTemplate() {
        return new RestTemplateBuilder();
    }

    @Value("${auth.server.url}")
    private String authServerUrl;
    private final String prefixToken = "Bearer ";

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        Map<String, String> pathParams = exchange.getAttribute(ServerWebExchangeUtils.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
        String authHeader = this.getAuthHeader(request);
        String validateUserUrlTemplate = "{0}/api/v1/{1}/user/validate";
        if (pathParams == null || pathParams.get("realm") == null) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }
        String url = MessageFormat.format(validateUserUrlTemplate, authServerUrl, pathParams.get("realm"));
        TokenDto token = restTemplate().defaultHeader(HttpHeaders.AUTHORIZATION, authHeader).build().getForObject(url, TokenDto.class);
        if(token == null || token.getToken() == null) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }
        String newToken = prefixToken + token.getToken();
        request.mutate()
                .header(HttpHeaders.AUTHORIZATION, newToken)
                .build();
        exchange.getAttributes().put(ServerWebExchangeUtils.GATEWAY_REQUEST_URL_ATTR, request.getURI());

        return chain.filter(exchange.mutate().request(request).build());
    }

    private String getAuthHeader(ServerHttpRequest request) {
        return request.getHeaders().getOrEmpty("Authorization").get(0);
    }
}
