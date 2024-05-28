package org.salesync.authentication.services.register;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.ws.rs.core.Response;
import lombok.RequiredArgsConstructor;
import org.hibernate.ObjectNotFoundException;
import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.KeyResource;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.RoleResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.crypto.KeyUse;
import org.keycloak.representations.AccessTokenResponse;
import org.keycloak.representations.idm.*;
import org.keycloak.representations.userprofile.config.UPAttribute;
import org.keycloak.representations.userprofile.config.UPAttributePermissions;
import org.keycloak.representations.userprofile.config.UPConfig;
import org.salesync.authentication.components.MessageQueueProducer;
import org.salesync.authentication.constants.AuthenticationClient;
import org.salesync.authentication.constants.AuthenticationInfo;
import org.salesync.authentication.constants.UserAttributes;
import org.salesync.authentication.dtos.*;
import org.salesync.authentication.entities.Company;
import org.salesync.authentication.enums.ActionType;
import org.salesync.authentication.helpers.SettingsManager;
import org.salesync.authentication.repositories.CompanyRepository;
import org.salesync.authentication.services.user.UserService;
import org.salesync.authentication.utils.StringUtility;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.util.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

@RequiredArgsConstructor
@Service
public class RegisterServiceImpl implements RegisterService {
    private final CompanyRepository companyRepository;
    private final Environment env;
    private final Keycloak keycloak;
    private final UserService userService;
    private final MessageQueueProducer messageQueueProducer;
    Logger logger = LoggerFactory.getLogger(RegisterServiceImpl.class);

    @Override
    public AccessTokenResponse registerCompany(CompanyRegisterDto companyRegisterDTO) throws AccessDeniedException {
        logger.info("Starting to register company...");
        Response adminRegisterResponse;
        try {
            String realmName = createRealm(companyRegisterDTO.getCompanyName());
            Company newCompany = new Company();
            newCompany.setName(companyRegisterDTO.getCompanyName());
            newCompany.setAvatarUrl("default");
            adminRegisterResponse = registerUser(
                    companyRegisterDTO.getAdminInfo(),
                    realmName);
            logger.info(String.format("Status Register: %s", adminRegisterResponse.getStatus()));
            LogInDto loginDto = new LogInDto(
                    companyRegisterDTO.getAdminInfo().getEmail(),
                    AuthenticationInfo.DEFAULT_PASSWORD);
            companyRepository.save(newCompany);
            messageQueueProducer.sendMessage("auth", MessageQueueDto.builder().actionType(ActionType.INIT_TYPES).payload(realmName).build());
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
    public Response registerUser(NewUserDto newUserDTO, String realmName, String token) throws AccessDeniedException {
        try {
            if (userService.validate(realmName, token) != null) {
                return registerUser(newUserDTO, realmName);
            } else {
                return Response.status(Response.Status.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        } finally {
            logger.info("Register User completed.");
        }
    }

    private Response registerUser(NewUserDto newUserDTO, String realmName) {
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
            sendEmailVerification(userResource);
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
    ) throws AccessDeniedException {
        logger.info(String.format("Starting Login into %s...", realmName));
        try(Keycloak keycloak = KeycloakBuilder.builder()
                .serverUrl(env.getProperty("keycloak.auth-server-url"))
                .realm(realmName)
                .grantType(OAuth2Constants.PASSWORD)
                .username(logInDTO.getUsername())
                .password(logInDTO.getPassword())
                .clientId(AuthenticationClient.APP_ADMIN)
                // .clientSecret(AuthenticationClient.APP_ADMIN)
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
        UserDto userInfo = null;
        try {
            userInfo = userService.validateUser(realmName, token);
        } catch (AccessDeniedException e) {
            e.printStackTrace();
        }
        List<UserSessionRepresentation> sessions = keycloak.realm(realmName).users().get(Objects.requireNonNull(userInfo).getUserId()).getUserSessions();
        for (UserSessionRepresentation session : sessions) {
            keycloak.realm(realmName).deleteSession(session.getId());
        }
        logger.info("Finish logging out.");
        return Response.ok().build();
    }

    @Override
    public VerifyEmailResponseDto verifyEmail(String token) {
        try {
            DecodedJWT decodeToken = JWT.decode(token);
            String keyId = decodeToken.getKeyId();
            Date expirationDate = decodeToken.getExpiresAt();
            String realmNameUrl = decodeToken.getClaim("iss").asString();
            logger.info(String.format("Starting to verify email in %s...", realmNameUrl));
            String realmName = realmNameUrl.substring(realmNameUrl.lastIndexOf("/") + 1);
            logger.info(String.format("Realm Name: %s", realmName));
            RealmResource realmResource = keycloak.realm(realmName);
            String verificationKey = getVerificationKey(realmResource);
            if (keyId.equals(verificationKey) && expirationDate.after(new Date())) {
                String userId = decodeToken.getClaim("sub").asString();
                UserResource userResource = realmResource.users().get(userId);
                UserRepresentation userRepresentation = userResource.toRepresentation();
                userRepresentation.setEmailVerified(true);
                userResource.update(userRepresentation);
                VerifyEmailResponseDto responseDto = new VerifyEmailResponseDto();
                String accessToken = userService.generateVerifyToken(userId, userRepresentation.getUsername(), responseDto.getEmail(), realmName);
                responseDto.setToken(accessToken);
                responseDto.setEmail(userRepresentation.getEmail());
                responseDto.setFirstName(userRepresentation.getFirstName());
                responseDto.setLastName(userRepresentation.getLastName());
                responseDto.setUserName(userRepresentation.getUsername());
                responseDto.setAvatarUrl(userRepresentation.getAttributes().get(UserAttributes.AVATAR).get(0));
                responseDto.setRealmName(realmName);
                responseDto.setUserId(userId);

                return responseDto;
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
        return null;
    }

    @Override
    public UpdateCompanyInfoDto updateCompany(String realmName, UpdateCompanyInfoDto updateCompanyInfoDto, String accessToken) throws AccessDeniedException {
        try {
            UserDetailDto user = userService.validateUser(realmName, accessToken);
            if (!userService.isUserInRole(keycloak.realm(realmName), user.getUserId(), AuthenticationInfo.ADMIN_SETTINGS_PERMISSION)) {
                throw new AccessDeniedException("Unauthorized");
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
        Company company = companyRepository.findById(UUID.fromString(updateCompanyInfoDto.getCompanyId())).orElseThrow(
                () -> new ObjectNotFoundException(
                        Company.class,
                        updateCompanyInfoDto.getCompanyId()
                ));
        if (!company.getName().equals(realmName)) {
            throw new IllegalArgumentException();
        }
        company.setAvatarUrl(updateCompanyInfoDto.getAvatarUrl());
        company.setPhone(updateCompanyInfoDto.getPhone());
        company.setDescription(updateCompanyInfoDto.getDescription());
        company.setAddress(updateCompanyInfoDto.getAddress());
        company.setTaxCode(updateCompanyInfoDto.getTaxCode());
        companyRepository.save(company);
        return updateCompanyInfoDto;
    }

    @Override
    public CompanyInfoDto getCompanyInfo(String companyName, String accessToken) throws AccessDeniedException {
        try {
            userService.validate(companyName, accessToken);
        } catch (Exception e) {
            e.printStackTrace();
            throw new AccessDeniedException("Unauthorized");
        }
        Company company = companyRepository.findCompaniesByName(companyName).orElseThrow(
                () -> new ObjectNotFoundException(
                        Company.class,
                        companyName
                ));
//
        CompanyInfoDto companyInfoDto = new CompanyInfoDto();
        companyInfoDto.setCompanyId(company.getCompanyId().toString());
        companyInfoDto.setPhone(company.getPhone());
        companyInfoDto.setAddress(company.getAddress());
        companyInfoDto.setDescription(company.getDescription());
        companyInfoDto.setTaxCode(company.getTaxCode());
        companyInfoDto.setName(company.getName());
        companyInfoDto.setAvatarUrl(company.getAvatarUrl());
        return companyInfoDto;
    }

    private String createRealm(String realmName) {
        try {
            realmName = realmName.replaceAll("\\s+", "").toLowerCase();
            RealmRepresentation realmRepresentation = new RealmRepresentation();
            realmRepresentation.setRealm(realmName);
            realmRepresentation.setAttributes(Map.of("frontendUrl",
                    Objects.requireNonNull(env.getProperty("main-website.address"))));
            realmRepresentation.setEnabled(true);
            realmRepresentation.setEmailTheme("salesync");
            realmRepresentation.setAccessTokenLifespan(1800);
            keycloak.realms().create(realmRepresentation);
            logger.info(String.format("Created Realm with name: %s", realmName));
            RealmResource realmResource = keycloak.realm(realmName);
            createDefaultRoles(realmResource);
            keycloak.realm(realmName).clients().create(getNewClientRepresentation());
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

    // private ClientRepresentation getNewClientRepresentation() {
    //     ClientRepresentation clientRepresentation = new ClientRepresentation();
    //     clientRepresentation.setClientId(AuthenticationClient.APP_ADMIN);
    //     clientRepresentation.setPublicClient(false);
    //     clientRepresentation.setAuthorizationServicesEnabled(false);
    //     clientRepresentation.setDirectAccessGrantsEnabled(true);
    //     CredentialRepresentation credential = new CredentialRepresentation();
    //     credential.setType(CredentialRepresentation.SECRET);
    //     credential.setValue(AuthenticationClient.APP_ADMIN_ID);
    //     clientRepresentation.setSecret(credential.getValue());
    //     return clientRepresentation;
    // }

    private ClientRepresentation getNewClientRepresentation() {
        ClientRepresentation clientRepresentation = new ClientRepresentation();
        clientRepresentation.setClientId(AuthenticationClient.APP_ADMIN);
        clientRepresentation.setPublicClient(false);
        clientRepresentation.setAuthorizationServicesEnabled(false);
        clientRepresentation.setDirectAccessGrantsEnabled(true);
        return clientRepresentation;
    }


    private void addEmailConfiguration(RealmResource realmResource) {
        RealmRepresentation realmRepresentation = realmResource.toRepresentation();

        Map<String, String> smtpConfig = new HashMap<>();
        smtpConfig.put("host", env.getProperty("mail.host"));
        smtpConfig.put("port",  env.getProperty("mail.port"));
        smtpConfig.put("from", String.format("service.%s@%s", realmRepresentation.getRealm().toLowerCase(), env.getProperty("mail.from")));
        smtpConfig.put("fromDisplayName", String.format("%s Customer Service", StringUtility.capFirstChar(realmRepresentation.getRealm())));
        smtpConfig.put("starttls", env.getProperty("mail.starttls"));
        smtpConfig.put("auth", env.getProperty("mail.auth"));
        smtpConfig.put("password",  env.getProperty("mail.password"));
        smtpConfig.put("user", env.getProperty("mail.user"));
        realmRepresentation.setSmtpServer(smtpConfig);
        realmResource.update(realmRepresentation);
    }

    private void createRoleOrPermission(RealmResource realmResource, String roleName) {
        RoleRepresentation roleRepresentation = new RoleRepresentation();
        roleRepresentation.setName(roleName);
        roleRepresentation.setComposite(true);
        realmResource.roles().create(roleRepresentation);
    }

    private void createDefaultRoles(RealmResource realmResource) {
        createRoleOrPermission(realmResource, AuthenticationInfo.STANDARD_ROLE);
        createRoleOrPermission(realmResource, AuthenticationInfo.ADMIN_ROLE);
        createRoleOrPermission(realmResource, AuthenticationInfo.READ_OWN_PERMISSION);
        createRoleOrPermission(realmResource, AuthenticationInfo.READ_ALL_PERMISSION);
        createRoleOrPermission(realmResource, AuthenticationInfo.EDIT_OWN_PERMISSION);
        createRoleOrPermission(realmResource, AuthenticationInfo.EDIT_ALL_PERMISSION);
        createRoleOrPermission(realmResource, AuthenticationInfo.DELETE_OWN_PERMISSION);
        createRoleOrPermission(realmResource, AuthenticationInfo.DELETE_ALL_PERMISSION);
        createRoleOrPermission(realmResource, AuthenticationInfo.CREATE_PERMISSION);
        createRoleOrPermission(realmResource, AuthenticationInfo.ADMIN_SETTINGS_PERMISSION);
        addPermissionsToRole(realmResource,
                AuthenticationInfo.ADMIN_ROLE, Arrays.asList(
                AuthenticationInfo.READ_ALL_PERMISSION,
                AuthenticationInfo.EDIT_ALL_PERMISSION,
                AuthenticationInfo.DELETE_ALL_PERMISSION,
                AuthenticationInfo.CREATE_PERMISSION,
                AuthenticationInfo.ADMIN_SETTINGS_PERMISSION
        ));
        addPermissionsToRole(realmResource,
                AuthenticationInfo.STANDARD_ROLE, Arrays.asList(
                AuthenticationInfo.READ_OWN_PERMISSION,
                AuthenticationInfo.EDIT_OWN_PERMISSION,
                AuthenticationInfo.DELETE_OWN_PERMISSION
        ));
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

    private void sendEmailVerification(UserResource userResource) {
        ExecutorService executor = Executors.newSingleThreadExecutor();
        executor.submit(() -> {
            int maxAttempts = AuthenticationInfo.EMAIL_SENDING_ATTEMPT;
            int retryDelay = AuthenticationInfo.RETRY_ATTEMPT_DELAY_SECOND;

            for (int attempt = 1; attempt <= maxAttempts; attempt++) {
                try {
                    userResource.sendVerifyEmail();
                    logger.info("Email sent successfully, attempt " + attempt);
                    return; // Exit if successful
                } catch (Exception e) {
                    logger.error("Email sending failed, on attempt " + attempt);
                    if (attempt < maxAttempts) {
                        try {
                            TimeUnit.SECONDS.sleep(retryDelay);
                        } catch (InterruptedException ex) {
                            // Handle interruption if needed
                        }
                    }
                }
            }

            // If all attempts fail
            logger.error("Failed to send email after all attempts.");
        });
        executor.shutdown();
    }

    private void addPermissionsToRole(RealmResource realmResource, String roleName, List<String> permissionList) {
        try {
            RoleResource roleResource = realmResource.roles().get(roleName);
            Set<RoleRepresentation> permissionRoles = new HashSet<>();
            for (String permissionName : permissionList) {
                permissionRoles.add(realmResource.roles().get(permissionName).toRepresentation());
            }
            if (permissionRoles.isEmpty()) {
                return;
            }
            roleResource.addComposites(permissionRoles.stream().toList());
        } catch (Exception e) {
            logger.error("Error occurred while fetching permissions");
            e.printStackTrace();
            throw e;
        }
    }

    private String getVerificationKey(RealmResource realmResource) {
        KeyResource keyResource = realmResource.keys();
        KeysMetadataRepresentation keysMetadata = keyResource.getKeyMetadata();
        List<KeysMetadataRepresentation.KeyMetadataRepresentation> keyList = keysMetadata.getKeys();
        String key = null;

        for (final KeysMetadataRepresentation.KeyMetadataRepresentation keyMetadata : keyList) {
            if (keyMetadata.getUse() != KeyUse.SIG || !keyMetadata.getAlgorithm().equals("HS512")) {
                continue;
            }
            key = keyMetadata.getKid();
            if (key != null) {
                break;
            }
        }

        return key;
    }

}
