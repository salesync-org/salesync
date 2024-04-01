package org.salesync.authentication.services.register;

import jakarta.ws.rs.core.Response;
import lombok.RequiredArgsConstructor;
import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.AccessTokenResponse;
import org.keycloak.representations.idm.*;
import org.keycloak.representations.userprofile.config.UPAttribute;
import org.keycloak.representations.userprofile.config.UPAttributePermissions;
import org.keycloak.representations.userprofile.config.UPConfig;
import org.salesync.authentication.constants.AuthenticationClient;
import org.salesync.authentication.constants.AuthenticationInfo;
import org.salesync.authentication.constants.UserAttributes;
import org.salesync.authentication.dtos.*;
import org.salesync.authentication.helpers.SettingsManager;
import org.salesync.authentication.services.user.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class RegisterServiceImpl implements RegisterService {
    private final Environment env;
    private final Keycloak keycloak;
    private UserService userService;
    Logger logger = LoggerFactory.getLogger(RegisterServiceImpl.class);

    @Autowired
    public RegisterServiceImpl(Environment env, Keycloak keycloak, UserService userService) {
        this.env = env;
        this.keycloak = keycloak;
        this.userService = userService;
    }

    @Override
    public AccessTokenResponse registerCompany(CompanyRegisterDto companyRegisterDTO) {
        logger.info("Starting to register company...");
        Response adminRegisterResponse;
        try {
            String realmName = createRealm(companyRegisterDTO.getCompanyName());
            adminRegisterResponse = registerUser(
                    companyRegisterDTO.getAdminInfo(),
                    realmName);
            logger.info(String.format("Status Register: %s", adminRegisterResponse.getStatus()));
            LogInDto loginDto = new LogInDto(
                    companyRegisterDTO.getAdminInfo().getEmail(),
                    AuthenticationInfo.DEFAULT_PASSWORD);
            return login(
                    realmName,
                    loginDto);
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        } finally {
            if (keycloak != null) {
                logger.info("Register completed.");
            }
        }
    }

    @Override
    public Response registerUser(NewUserDto newUserDTO, String realmName) {
        try {
            logger.info(String.format("Starting Register User in %s...", realmName));
            UserRepresentation user = new UserRepresentation();
            user.setEmail(newUserDTO.getEmail());
            user.setUsername(newUserDTO.getEmail());
            user.setFirstName(newUserDTO.getFirstName());
            user.setLastName(newUserDTO.getLastName());
            user.singleAttribute(UserAttributes.JOB_TITLE, newUserDTO.getJobTitle());
            user.singleAttribute(UserAttributes.AVATAR, UserAttributes.DEFAULT_AVATAR_NAME);
            user.singleAttribute(UserAttributes.PHONE, newUserDTO.getPhone());
            SettingsManager settingsManager = new SettingsManager();
            user.singleAttribute(UserAttributes.SETTINGS, settingsManager.loadStringSettingsFromFile());
            user.setEnabled(true);

            Response response = keycloak.realm(realmName).users().create(user);
            UserRepresentation newUser = keycloak.realm(realmName).users().search(newUserDTO.getEmail()).get(0);
            UserResource userResource = keycloak.realm(realmName).users().get(newUser.getId());
//            userResource.sendVerifyEmail();
            CredentialRepresentation credential = new CredentialRepresentation();
            credential.setType(CredentialRepresentation.PASSWORD);
            credential.setValue(AuthenticationInfo.DEFAULT_PASSWORD);
//            credential.setTemporary(true);
            userResource.resetPassword(credential);
            addRoleToUser(keycloak.realm(realmName), newUserDTO.getRole(), newUser.getId());
            return response;
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        } finally {
            logger.info("Register User completed.");
        }
    }

    @Override
    public AccessTokenResponse login(
            String realmName,
            LogInDto logInDTO
    ) {
        logger.info(String.format("Starting Login into %s...", realmName));
        try(Keycloak keycloak = KeycloakBuilder.builder()
                .serverUrl(env.getProperty("keycloak.auth-server-url"))
                .realm(realmName)
                .grantType(OAuth2Constants.PASSWORD)
                .username(logInDTO.getUsername())
                .password(logInDTO.getPassword())
                .clientId(AuthenticationClient.ADMIN)
                .build()) {

            logger.info("Logging in Sever URL: " + env.getProperty("keycloak.auth-server-url"));
            logger.info("Username: " + logInDTO.getUsername());
            LogInResponseDto logInResponseDto = new LogInResponseDto();
            AccessTokenResponse accessTokenResponse = keycloak.tokenManager().getAccessToken();
            UserDto userDto = userService.validateUser(realmName, accessTokenResponse.getToken());
            logInResponseDto.setToken(accessTokenResponse.getToken());
            logInResponseDto.setRefreshToken(accessTokenResponse.getRefreshToken());
            logInResponseDto.setExpiresIn(accessTokenResponse.getExpiresIn());
            logInResponseDto.setUser(userDto);
            return logInResponseDto;
        } catch (Exception e) {
            logger.error("Login Error happened.");
            e.printStackTrace();
            throw e;
        } finally {
            logger.info("Login completed.");
        }

    }

    @Override
    public Response logout(String realmName, String token) {
        logger.info("Starting Logout...");
        UserDto userInfo = userService.validateUser(realmName, token);
        keycloak.realm(realmName).users().get(userInfo.getUserId()).logout();
        logger.info("Finish logging out.");
        return Response.ok().build();
    }

    private String createRealm(String realmName) {
        try {
            realmName = realmName.replaceAll("\\s+", "").toLowerCase();
            RealmRepresentation realmRepresentation = new RealmRepresentation();
            realmRepresentation.setRealm(realmName);
            realmRepresentation.setAttributes(Map.of("frontendUrl",
                    Objects.requireNonNull(env.getProperty("main-website.address"))));
            realmRepresentation.setEnabled(true);
            keycloak.realms().create(realmRepresentation);
            logger.info(String.format("Created Realm with name: %s", realmName));
            RealmResource realmResource = keycloak.realm(realmName);
            createRoles(realmResource, AuthenticationInfo.STANDARD_ROLE);
            createRoles(realmResource, AuthenticationInfo.ADMIN_ROLE);
            createAttribute(realmResource, UserAttributes.AVATAR, UserAttributes.AVATAR_LABEL);
            createAttribute(realmResource, UserAttributes.JOB_TITLE, UserAttributes.JOB_TITLE_LABEL);
            createAttribute(realmResource, UserAttributes.PHONE, UserAttributes.PHONE_LABEL);
            createAttribute(realmResource, UserAttributes.SETTINGS, UserAttributes.SETTINGS_LABEL);
            addEmailConfiguration(keycloak.realm(realmName));
            return realmName;
        } catch (Exception e) {
            logger.error("Create Realm error happened.");
            e.printStackTrace();
            throw e;
        } finally {
            logger.info("Finish creating new realm.");
        }
    }

    private void addEmailConfiguration(RealmResource realmResource) {
        RealmRepresentation realmRepresentation = realmResource.toRepresentation();

        Map<String, String> smtpConfig = new HashMap<>();
        smtpConfig.put("host", env.getProperty("mail.host"));
        smtpConfig.put("port",  env.getProperty("mail.port"));
        smtpConfig.put("from", env.getProperty("mail.from"));
        smtpConfig.put("starttls", env.getProperty("mail.starttls"));
        smtpConfig.put("auth", env.getProperty("mail.auth"));
        smtpConfig.put("password",  env.getProperty("mail.password"));
        smtpConfig.put("user", env.getProperty("mail.user"));
        realmRepresentation.setSmtpServer(smtpConfig);
        realmResource.update(realmRepresentation);
    }

    private void createRoles(RealmResource realmResource, String roleName) {
        RoleRepresentation roleRepresentation = new RoleRepresentation();
        roleRepresentation.setName(roleName);
        realmResource.roles().create(roleRepresentation);
    }

    private void addRoleToUser(RealmResource realmResource, String roleName, String userId) {
        RoleRepresentation roleRepresentation = realmResource.roles().get(roleName).toRepresentation();
        realmResource.users().get(userId).roles().realmLevel().add(Collections.singletonList(roleRepresentation));
    }

    private void createAttribute(RealmResource realmResource, String attributeName, String attributeDisplayName) {
        UPConfig config = realmResource.users().userProfile().getConfiguration();
        UPAttribute attribute = new UPAttribute();
        attribute.setName(attributeName);
        attribute.setDisplayName(attributeDisplayName);
        UPAttributePermissions permissions = new UPAttributePermissions();
        permissions.setEdit(Set.of("user", "admin")); // Default String values of Keycloak
        permissions.setView(Set.of("user", "admin"));
        attribute.setPermissions(permissions);
        config.addOrReplaceAttribute(attribute);
        realmResource.users().userProfile().update(config);

    }
}
