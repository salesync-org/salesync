package org.salesync.authentication.components;

import org.keycloak.admin.client.Keycloak;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
public class KeyCloakConfigComponent {
    private final Environment env;

    @Autowired
    public KeyCloakConfigComponent(Environment env) {
        this.env = env;
    }

    public Keycloak getKeycloakInstance() {
        return Keycloak.getInstance(
                env.getProperty("keycloak.auth-server-url"),
                env.getProperty("keycloak.realm"),
                env.getProperty("keycloak-config.username"),
                env.getProperty("keycloak-config.password"),
                env.getProperty("keycloak.resource"),
                env.getProperty("keycloak-config.client-secret"));
    }

    public Keycloak getKeycloakInstance(String username, String password, String realm, String clientId) {
        return Keycloak.getInstance(
                env.getProperty("keycloak.auth-server-url"),
                env.getProperty(realm),
                username,
                password,
                clientId);
    }
}
