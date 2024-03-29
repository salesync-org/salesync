package org.salesync.authentication.services.companyregister;

import jakarta.ws.rs.core.Response;
import lombok.RequiredArgsConstructor;
import org.keycloak.OAuth2Constants;
import org.keycloak.TokenVerifier;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.KeyResource;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.crypto.KeyUse;
import org.keycloak.representations.AccessToken;
import org.keycloak.representations.AccessTokenResponse;
import org.keycloak.representations.idm.*;
import org.salesync.authentication.converters.PublicKeyConverter;
import org.salesync.authentication.dtos.CompanyRegisterDto;
import org.salesync.authentication.dtos.LogInDto;
import org.salesync.authentication.dtos.NewUserDto;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.security.PublicKey;
import java.util.Arrays;
import java.util.List;

import static org.keycloak.crypto.KeyUse.ENC;

@Service
@RequiredArgsConstructor
public class RegisterServiceImpl implements RegisterService {
    private final Environment env;
    private final Keycloak keycloak;

    @Override
    public AccessTokenResponse registerCompany(CompanyRegisterDto companyRegisterDTO) {
        System.out.println("Starting registerCompany");
        Response adminRegisterResponse = null;
        try {
            RealmRepresentation realm = new RealmRepresentation();
            String realmName = companyRegisterDTO.getCompanyName().replaceAll("\\s+", "").toLowerCase();
            realm.setRealm(realmName);
            realm.setEnabled(true);
            keycloak.realms().create(realm);
            System.out.println("Created Realm with name: " + realmName);
            keycloak.realm(realmName).clients().create(getNewClientRepresentation("app-admin", "app-admin"));
            keycloak.realm(realmName).clients().create(getNewClientRepresentation("app-user", "app-user"));
            createRoles(keycloak.realm(realmName), "standard-user");
            createRoles(keycloak.realm(realmName), "admin-user");
            adminRegisterResponse = registerUser(companyRegisterDTO.getAdminInfo(), realmName, "account");
            System.out.println("Status Register" + adminRegisterResponse.getStatus());
            return login(realmName, new LogInDto(companyRegisterDTO.getAdminInfo().getEmail(), "admin"), "app-admin", "app-admin");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (keycloak != null) {
                System.out.println("Closing Keycloak");
//                keycloak.close();
            }
        }
        return null;
    }

    @Override
    public Response registerUser(NewUserDto newUserDTO, String realmName, String clientId) {
        Response response = null;
        try {
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
//            credential.setTemporary(true);
            userResource.resetPassword(credential);
            addRoleToUser(keycloak.realm(realmName), newUserDTO.getRole(), newUser.getId());

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (keycloak != null) {
                System.out.println("Closing Keycloak");
//                keycloak.close();
            }
        }
        return response;
    }

    @Override
    public AccessTokenResponse login(
            String realmName,
            LogInDto logInDTO,
            String clientId,
            String clientSecret
    ) {
        Keycloak keycloak = null;
        Response response = null;
            keycloak = KeycloakBuilder.builder()
                    .serverUrl(env.getProperty("keycloak.auth-server-url"))
                    .realm(realmName)
                    .grantType(OAuth2Constants.PASSWORD)
                    .clientId(clientId)
                    .clientSecret(clientSecret)
                    .username(logInDTO.getUsername())
                    .password(logInDTO.getPassword())
                    .clientId(clientId)
                    .build();

            System.out.println("Logging in Sever URL: " + env.getProperty("keycloak.auth-server-url"));
            System.out.println("Logging in Realm: " + realmName);
            System.out.println("Username: " + logInDTO.getUsername());
            System.out.println("Password: " + logInDTO.getPassword());
            System.out.println("Client ID: " + clientId);
            return keycloak.tokenManager().getAccessToken();
    }

    @Override
    public Response logout(String token) {
        keycloak.tokenManager().invalidate(token);
        return Response.ok().build();
    }

    @Override
    public AccessTokenResponse validate(String realmId, String accessToken) {
//        keycloak.realm("salesynctest")
//                .clients()
//                .get("admin-cli").toRepresentation();
        RealmResource realmResource = keycloak.realm(realmId);
        System.out.println("Got realmResource: " + realmResource);
        KeyResource keyResource = realmResource.keys();
        System.out.println("Got keyResource " + keyResource);
        KeysMetadataRepresentation keysMetadata = keyResource.getKeyMetadata();
        System.out.println("Got keysMetadata " + keysMetadata);
        List<KeysMetadataRepresentation.KeyMetadataRepresentation> keyList = keysMetadata.getKeys();
        System.out.println("Got keyMetadata " + keyList);
        String key = null;

        for (final KeysMetadataRepresentation.KeyMetadataRepresentation keyMetadata : keyList) {
            if (keyMetadata.getUse() != KeyUse.SIG) {
                continue;
            }
            key = keyMetadata.getPublicKey();
            if (key != null) {
                break;
            }
        }
        System.out.println("Got key " + key);
        try {
            PublicKey publicKey = PublicKeyConverter.convertStringToPublicKey(key);
            System.out.println(key);
            System.out.println(publicKey);
            AccessToken token = TokenVerifier.create(accessToken, AccessToken.class)
                    .publicKey(publicKey) // Set your RSA Public Key
                    .verify()
                    .getToken();
            System.out.println(token.getSubject());
            if (token.isActive()) {
                AccessTokenResponse accessTokenResponse = new AccessTokenResponse();
                accessTokenResponse.setToken(accessToken);
                return accessTokenResponse;
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return null;
    }

    private ClientRepresentation getNewClientRepresentation(String clientSecret, String clientName) {
        ClientRepresentation clientRepresentation = new ClientRepresentation();
        clientRepresentation.setClientId(clientName);
        clientRepresentation.setPublicClient(false);
        clientRepresentation.setAuthorizationServicesEnabled(false);
        clientRepresentation.setDirectAccessGrantsEnabled(true);
        CredentialRepresentation credential = new CredentialRepresentation();
        credential.setType(CredentialRepresentation.SECRET);
        credential.setValue(clientSecret);
        clientRepresentation.setSecret(credential.getValue());
        return clientRepresentation;
    }

    private void createRoles(RealmResource realmResource, String roleName) {
        RoleRepresentation roleRepresentation = new RoleRepresentation();
        roleRepresentation.setName(roleName);
        realmResource.roles().create(roleRepresentation);
    }

    private void addRoleToUser(RealmResource realmResource, String roleName, String userId) {
        RoleRepresentation roleRepresentation = realmResource.roles().get(roleName).toRepresentation();
        realmResource.users().get(userId).roles().realmLevel().add(Arrays.asList(roleRepresentation));
    }
}
