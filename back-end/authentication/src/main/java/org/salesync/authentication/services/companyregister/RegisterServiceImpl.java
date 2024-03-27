package org.salesync.authentication.services.companyregister;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.ws.rs.core.Response;
import lombok.RequiredArgsConstructor;
import org.keycloak.OAuth2Constants;
import org.keycloak.TokenVerifier;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.KeyResource;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UserProfileResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.crypto.KeyUse;
import org.keycloak.representations.AccessToken;
import org.keycloak.representations.AccessTokenResponse;
import org.keycloak.representations.idm.*;
import org.keycloak.representations.userprofile.config.UPAttribute;
import org.keycloak.representations.userprofile.config.UPAttributePermissions;
import org.keycloak.representations.userprofile.config.UPConfig;
import org.salesync.authentication.converters.PublicKeyConverter;
import org.salesync.authentication.dtos.CompanyRegisterDto;
import org.salesync.authentication.dtos.LogInDto;
import org.salesync.authentication.dtos.NewUserDto;
import org.salesync.authentication.dtos.UserDto;
import org.salesync.authentication.helpers.SettingsManager;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.security.PublicKey;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Set;

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
            createAttribute(keycloak.realm(realmName), "avatarUrl", "Avatar URL");
            createAttribute(keycloak.realm(realmName), "jobTitle", "Job Title");
            createAttribute(keycloak.realm(realmName), "phone", "Phone");
            createAttribute(keycloak.realm(realmName), "settings", "Settings");
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
            user.singleAttribute("avatarUrl", "default");
            user.singleAttribute("phone", newUserDTO.getPhone());
            SettingsManager settingsManager = new SettingsManager();
            user.singleAttribute("settings", settingsManager.loadSettingsFromFile());
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
        Keycloak keycloak = KeycloakBuilder.builder()
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
    public UserDto validateUser(String realmId, String accessToken) {
        RealmResource realmResource = keycloak.realm(realmId);
        KeyResource keyResource = realmResource.keys();
        KeysMetadataRepresentation keysMetadata = keyResource.getKeyMetadata();
        List<KeysMetadataRepresentation.KeyMetadataRepresentation> keyList = keysMetadata.getKeys();
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
        if (key == null) {
            return null;
        }
        try {
            PublicKey publicKey = PublicKeyConverter.convertStringToPublicKey(key);
            AccessToken token = TokenVerifier.create(accessToken, AccessToken.class)
                    .publicKey(publicKey) // Set your RSA Public Key
                    .verify()
                    .getToken();
            if (token.isActive()) {
                String userId = token.getSubject();
                UserRepresentation user = realmResource.users().get(userId).toRepresentation();
                Map<String, List<String>> attributes = user.getAttributes();
                UserDto userDto = new UserDto();
                userDto.setFirstName(user.getFirstName());
                userDto.setLastName(user.getLastName());
                userDto.setEmail(user.getEmail());
                userDto.setUserId(user.getId());
                userDto.setUserName(user.getUsername());
                userDto.setAvatarUrl(attributes.get("avatarUrl").get(0));
                userDto.setJobTitle(attributes.get("jobTitle").get(0));
                userDto.setPhone(attributes.get("phone").get(0));
                userDto.setRoles(user.getRealmRoles());
                SettingsManager settings = new SettingsManager();
                userDto.setSettings(settings.parseSettings(attributes.get("settings").get(0)));
                return userDto;
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

    private void createAttribute(RealmResource realmResource, String attributeName,  String attributeDisplayName) {
        UPConfig config = realmResource.users().userProfile().getConfiguration();
        UPAttribute attribute = new UPAttribute();
        attribute.setName(attributeName);
        attribute.setDisplayName(attributeDisplayName);
        UPAttributePermissions permissions = new UPAttributePermissions();
        permissions.setEdit(Set.of("user", "admin"));
        permissions.setView(Set.of("user", "admin"));
        attribute.setPermissions(permissions);
        config.addOrReplaceAttribute(attribute);
        realmResource.users().userProfile().update(config);

    }
}
