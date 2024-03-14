package org.salesync.apigateway.config;

import org.salesync.apigateway.constants.Service;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.text.MessageFormat;

@Configuration
public class ApiGatewayConfig {
    @Bean
    public RouteLocator gatewayRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route(Service.Type.NAME,
                        r -> r.path(MessageFormat
                                        .format("{0}{1}/**", Service.CONTEXT_PATH, Service.Type.ENDPOINT))
                                .uri(MessageFormat
                                        .format("{0}{1}", Service.LOADBALANCER, Service.Type.NAME))
                )
                .route(Service.Record.NAME,
                        r -> r.path(MessageFormat
                                        .format("{0}{1}/**", Service.CONTEXT_PATH, Service.Record.ENDPOINT))
                                .uri(MessageFormat
                                        .format("{0}{1}", Service.LOADBALANCER, Service.Record.NAME))
                )
                .route("eureka-server",
                        r -> r.path("/eureka/web")
                                .filters(f -> f.rewritePath("/eureka/web", "/"))
                                .uri("http://localhost:8761")
                )
                .route("eureka-server-static",
                        r -> r.path("/eureka/**")
                                .uri("http://localhost:8761")
                )
                .build();
    }
}
