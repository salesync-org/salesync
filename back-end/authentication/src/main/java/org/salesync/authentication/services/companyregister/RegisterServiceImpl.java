package org.salesync.authentication.services.companyregister;

import jakarta.ws.rs.core.Response;
import lombok.RequiredArgsConstructor;
import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.AccessTokenResponse;
import org.keycloak.representations.idm.ClientRepresentation;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RealmRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.salesync.authentication.components.KeyCloakConfigComponent;
import org.salesync.authentication.dtos.CompanyRegisterDTO;
import org.salesync.authentication.dtos.LogInDTO;
import org.salesync.authentication.dtos.NewUserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collections;

@Service
@RequiredArgsConstructor
public class RegisterServiceImpl implements IRegisterService {
    Environment env;
    KeyCloakConfigComponent keycloakConfigComponent;
    @Autowired
    public RegisterServiceImpl(Environment env) {
        this.env = env;
        keycloakConfigComponent = new KeyCloakConfigComponent(env);
    }

    @Override
    public AccessTokenResponse registerCompany(CompanyRegisterDTO companyRegisterDTO) {
        System.out.println("Starting registerCompany");
        Keycloak keycloak = null;
        Response adminRegisterResponse = null;
        try {
            keycloak = keycloakConfigComponent.getKeycloakInstance();
            RealmRepresentation realm = new RealmRepresentation();
            String realmName = companyRegisterDTO.getCompanyName().replaceAll("\\s+", "").toLowerCase();
            realm.setRealm(realmName);
            realm.setEnabled(true);
            keycloak.realms().create(realm);
            System.out.println("Created Realm with name: " + realmName);
            keycloak.realm(realmName).clients().create(createClient("app-admin", "app-admin", realmName));
            keycloak.realm(realmName).clients().create(createClient("app-user", "app-user", realmName));
            adminRegisterResponse = registerUser(companyRegisterDTO.getAdminInfo(), realmName, "app-admin");
            System.out.println("Status Register" + adminRegisterResponse.getStatus());
            return login(new LogInDTO(realmName, companyRegisterDTO.getAdminInfo().getEmail(), "admin"), "app-admin", "app-admin");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (keycloak != null) {
                System.out.println("Closing Keycloak");
                keycloak.close();
            }
        }
        return null;
    }

    @Override
    public Response registerUser(NewUserDTO newUserDTO, String realmName, String clientId) {
        Keycloak keycloak = null;
        Response response = null;
        try {
//            keycloak = keycloakConfigComponent.getKeycloakInstance(env.getProperty("keycloak-config.username"), env.getProperty("keycloak-config.password"), realmName, clientId);
            keycloak = keycloakConfigComponent.getKeycloakInstance();
            UserRepresentation user = new UserRepresentation();
            user.setEmail(newUserDTO.getEmail());
            user.setUsername(newUserDTO.getEmail());
            user.setFirstName(newUserDTO.getFirstName());
            user.setLastName(newUserDTO.getLastName());
            user.singleAttribute("jobTitle", newUserDTO.getJobTitle());
            user.setEnabled(true);

            response = keycloak.realm(realmName).users().create(user);
            UserRepresentation newUser = keycloak.realm(realmName).users().search(newUserDTO.getEmail()).get(0);
            UserResource userResource = keycloak.realm(realmName).users().get(newUser.getId());
            // The below line of code is not yet performable due to the lack of an email server
//            keycloak.realm(realmName).users().get(newUser.getId()).executeActionsEmail(Arrays.asList("UPDATE_PASSWORD"));
            CredentialRepresentation credential = new CredentialRepresentation();
            credential.setType(CredentialRepresentation.PASSWORD);
            credential.setValue("admin"); // Bad practice, I know
            credential.setTemporary(true);
            userResource.resetPassword(credential);

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (keycloak != null) {
                System.out.println("Closing Keycloak");
                keycloak.close();
            }
        }
        return response;
    }

    @Override
    public AccessTokenResponse login(LogInDTO logInDTO, String clientId, String clientSecret) {
        Keycloak keycloak = null;
        Response response = null;
        try {
            keycloak = KeycloakBuilder.builder()
                    .serverUrl(env.getProperty("keycloak.auth-server-url"))
                    .realm(logInDTO.getRealm())
                    .grantType(OAuth2Constants.PASSWORD)
                    .clientId(clientId)
                    .clientSecret(clientSecret)
                    .username(logInDTO.getUsername())
                    .password(logInDTO.getPassword())
                    .build();

            System.out.println("Logging in Sever URL: " + env.getProperty("keycloak.auth-server-url"));
            System.out.println("Logging in Realm: " + logInDTO.getRealm());
            System.out.println("Username: " + logInDTO.getUsername());
            System.out.println("Password: " + logInDTO.getPassword());
            System.out.println("Client ID: " + clientId);
            System.out.println("Logging in Client Secret: " + clientSecret);
            return keycloak.tokenManager().getAccessToken();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (keycloak != null) {
                System.out.println("Closing Keycloak");
                keycloak.close();
            }
        }
//        return response;
        return null;
    }

    private ClientRepresentation createClient(String clientSecret, String clientName, String realmName) {
        ClientRepresentation clientRepresentation = new ClientRepresentation();
        clientRepresentation.setClientId(clientName); // Optional: Customize clientId
        clientRepresentation.setPublicClient(false); // Confidential client for backend service
        // Add specific client scopes if needed
        CredentialRepresentation credential = new CredentialRepresentation();
        credential.setType(CredentialRepresentation.SECRET);
        credential.setValue(clientSecret);
        clientRepresentation.setSecret(credential.getValue());
        return clientRepresentation;
    }

}
