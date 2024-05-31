package org.salesync.authentication.configurations;

import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Configuration
@RequiredArgsConstructor
public class KeyCloakConfig {

    private final Environment env;

    @Bean
    public Keycloak getKeycloakInstance() {
        return Keycloak.getInstance(env.getProperty("keycloak.auth-server-url"), env.getProperty("keycloak.realm"),
                env.getProperty("keycloak-config.username"), env.getProperty("keycloak-config.password"),
                env.getProperty("keycloak.resource"));
    }
}
