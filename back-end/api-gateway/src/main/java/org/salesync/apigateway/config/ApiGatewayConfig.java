package org.salesync.apigateway.config;

import lombok.RequiredArgsConstructor;
import org.salesync.apigateway.constants.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.util.UriComponentsBuilder;

import java.text.MessageFormat;

@Configuration
@RequiredArgsConstructor
public class ApiGatewayConfig {
    @Value("${auth.server.url}")
    private String authServerUrl;
    private final AuthenticationFilter authenticationFilter;

    @Bean
    public RouteLocator gatewayRoutes(RouteLocatorBuilder builder) {
        return builder.routes().route(Service.Auth.NAME, r -> r
                .path(MessageFormat.format("{0}{1}/**", Service.CONTEXT_PATH, Service.Auth.ENDPOINT))
                .filters(f -> f.rewritePath(MessageFormat.format("{0}{1}", Service.CONTEXT_PATH, Service.Auth.ENDPOINT),
                        Service.Auth.AUTH_CONTEXT_PATH))
                .uri(UriComponentsBuilder.fromUriString(authServerUrl).build().toUriString()))
                .route(Service.Type.NAME,
                        r -> r.path(MessageFormat.format("{0}{1}{2}/**", Service.CONTEXT_PATH, "/{realm}",
                                Service.Type.ENDPOINT)).filters(f -> f.filter(authenticationFilter))
                                .uri(MessageFormat.format("{0}{1}", Service.LOADBALANCER, Service.Type.NAME))

                )
                .route(Service.Stage.NAME,
                        r -> r.path(MessageFormat.format("{0}{1}{2}/**", Service.CONTEXT_PATH, "/{realm}",
                                Service.Stage.ENDPOINT)).filters(f -> f.filter(authenticationFilter))
                                .uri(MessageFormat.format("{0}{1}", Service.LOADBALANCER, Service.Stage.NAME))

                )
                .route(Service.Templates.NAME,
                        r -> r.path(MessageFormat.format("{0}{1}{2}/**", Service.CONTEXT_PATH, "/{realm}",
                                Service.Templates.ENDPOINT)).filters(f -> f.filter(authenticationFilter))
                                .uri(MessageFormat.format("{0}{1}", Service.LOADBALANCER, Service.Templates.NAME))

                )
                .route(Service.Relation.NAME,
                        r -> r.path(MessageFormat.format("{0}{1}{2}/**", Service.CONTEXT_PATH, "/{realm}",
                                Service.Relation.ENDPOINT)).filters(f -> f.filter(authenticationFilter))
                                .uri(MessageFormat.format("{0}{1}", Service.LOADBALANCER, Service.Relation.NAME))

                )
                .route(Service.Record.NAME,
                        r -> r.path(MessageFormat.format("{0}{1}{2}/**", Service.CONTEXT_PATH, "/{realm}",
                                Service.Record.ENDPOINT)).filters(f -> f.filter(authenticationFilter))
                                .uri(MessageFormat.format("{0}{1}", Service.LOADBALANCER, Service.Record.NAME))

                )
                .route("eureka-server",
                        r -> r.path("/eureka/web").filters(f -> f.rewritePath("/eureka/web", "/"))
                                .uri("http://localhost:8761"))
                .route("eureka-server-static", r -> r.path("/eureka/**").uri("http://localhost:8761")).build();
    }
}
