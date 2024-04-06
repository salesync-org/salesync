package org.salesync.apigateway.config;

import lombok.RequiredArgsConstructor;
import org.salesync.apigateway.constants.Service;
import org.salesync.apigateway.dtos.TokenDto;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.route.Route;
import org.springframework.cloud.gateway.support.ServerWebExchangeUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.text.MessageFormat;
import java.util.Map;

@RefreshScope
@Configuration
@RequiredArgsConstructor
public class AuthenticationFilter implements GatewayFilter {

    private final WebClient.Builder webClientBuilder;

    @Bean
    public RestTemplateBuilder restTemplate() {
        return new RestTemplateBuilder();
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        Route route = exchange.getAttribute(ServerWebExchangeUtils.GATEWAY_ROUTE_ATTR);
        Map<String, String> pathParams = exchange.getAttribute(ServerWebExchangeUtils.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
        String authHeader = this.getAuthHeader(request);
        String url = MessageFormat.format("http://localhost:8082/api/v1/{0}/user/validate", pathParams.get("realm"));
        TokenDto token = restTemplate().defaultHeader(HttpHeaders.AUTHORIZATION, authHeader).build().getForObject(url, TokenDto.class);
        String path = request.getURI().getRawPath().replaceFirst("/" + pathParams.get("realm"), "");
        String _token = "Bearer " + token.getToken();
        request.mutate()
                .header(HttpHeaders.AUTHORIZATION, _token)
                .build();
        exchange.getAttributes().put(ServerWebExchangeUtils.GATEWAY_REQUEST_URL_ATTR, request.getURI());

        return chain.filter(exchange.mutate().request(request).build());
    }

    private String getAuthHeader(ServerHttpRequest request) {
        return request.getHeaders().getOrEmpty("Authorization").get(0);
    }
}
