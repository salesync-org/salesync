package org.salesync.authentication.services.user;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import jakarta.ws.rs.core.Response;
import lombok.RequiredArgsConstructor;
import org.keycloak.TokenVerifier;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.*;
import org.keycloak.authorization.client.AuthorizationDeniedException;
import org.keycloak.crypto.KeyUse;
import org.keycloak.representations.AccessToken;
import org.keycloak.representations.idm.*;
import org.salesync.authentication.configurations.KeyStoreConfig;
import org.salesync.authentication.constants.AuthenticationInfo;
import org.salesync.authentication.constants.UserAttributes;
import org.salesync.authentication.converters.KeyConverter;
import org.salesync.authentication.dtos.*;
import org.salesync.authentication.helpers.SettingsManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.AccessDeniedException;
import java.security.PublicKey;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.util.*;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final Keycloak keycloak;
    private final KeyStoreConfig keyStore;
    private final Environment env;
    private final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Override
    public UserDetailDto validateUser(String realmName, String accessToken) throws AccessDeniedException {
        try {
            RealmResource realmResource = keycloak.realm(realmName);
            PublicKey publicKey = KeyConverter.convertStringToPublicKey(getKey(realmResource));
            AccessToken token = TokenVerifier.create(accessToken, AccessToken.class).publicKey(publicKey).verify()
                    .getToken();
            if (token.isActive()) {
                String userId = token.getSubject();
                return loadDetailUser(realmResource, userId);
            }
        } catch (Exception e) {
            throw new AccessDeniedException(e.getMessage());
        }
        return null;
    }

    @Override
    public UserDto modifyInfo(String accessToken, UserDto userDto, String realmName) throws AccessDeniedException {
        try {
            RealmResource realmResource = keycloak.realm(realmName);
            PublicKey publicKey = KeyConverter.convertStringToPublicKey(getKey(realmResource));
            AccessToken token = TokenVerifier.create(accessToken, AccessToken.class).publicKey(publicKey) // Set your
                                                                                                          // RSA Public
                                                                                                          // Key
                    .verify().getToken();
            if (token.isActive()) {
                String userId = token.getSubject();
                UserRepresentation user = realmResource.users().get(userId).toRepresentation();
                user.setFirstName(userDto.getFirstName());
                user.setLastName(userDto.getLastName());
                Map<String, List<String>> attributes = user.getAttributes();
                attributes.put(UserAttributes.AVATAR, List.of(userDto.getAvatarUrl()));
                attributes.put(UserAttributes.JOB_TITLE, List.of(userDto.getJobTitle()));
                attributes.put(UserAttributes.PHONE, List.of(userDto.getPhone()));
                attributes.put(UserAttributes.SETTINGS,
                        List.of(new SettingsManager().updatedSettingsString(userDto.getSettings())));
                user.setAttributes(attributes);
                realmResource.users().get(userId).update(user);
                return loadUser(realmResource, userId);
            }
        } catch (Exception e) {
            throw new AccessDeniedException(e.getMessage());
        }
        return null;
    }

    @Override
    public UserDto resetSettings(String accessToken, String realmName) throws AccessDeniedException {
        try {
            RealmResource realmResource = keycloak.realm(realmName);
            PublicKey publicKey = KeyConverter.convertStringToPublicKey(getKey(realmResource));
            AccessToken token = TokenVerifier.create(accessToken, AccessToken.class).publicKey(publicKey) // Set your
                                                                                                          // RSA Public
                                                                                                          // Key
                    .verify().getToken();
            if (token.isActive()) {
                String userId = token.getSubject();
                UserRepresentation user = realmResource.users().get(userId).toRepresentation();
                Map<String, List<String>> attributes = user.getAttributes();
                attributes.put(UserAttributes.SETTINGS, List.of(new SettingsManager().loadStringSettingsFromFile()));
                user.setAttributes(attributes);
                realmResource.users().get(userId).update(user);
                return loadUser(realmResource, userId);
            }
        } catch (Exception e) {
            throw new AccessDeniedException(e.getMessage());
        }
        return null;
    }

    @Override
    public ValidationResponseDto validate(String realmName, String accessToken) throws AccessDeniedException {
        try {
            RealmResource realmResource = keycloak.realm(realmName);
            PublicKey publicKey = KeyConverter.convertStringToPublicKey(getKey(realmResource));
            AccessToken token = TokenVerifier.create(accessToken, AccessToken.class).publicKey(publicKey).verify()
                    .getToken();
            if (token.isActive()) {
                String responseToken = generateToken(loadDetailUser(realmResource, token.getSubject()));
                ValidationResponseDto response = new ValidationResponseDto();
                response.setToken(responseToken);
                return response;
            }
        } catch (Exception e) {
            throw new AccessDeniedException(e.getMessage());
        }
        return null;
    }

    @Override
    public String resetPassword(String token, String realmName, ResetPasswordDto resetPasswordDto) {
        try {
            RealmResource realmResource = keycloak.realm(realmName);
            if (verifyToken(token)) {
                String userId = resetPasswordDto.getUserId();
                CredentialRepresentation credential = new CredentialRepresentation();
                credential.setType(CredentialRepresentation.PASSWORD);
                credential.setValue(resetPasswordDto.getNewPassword());
                realmResource.users().get(userId).resetPassword(credential);

                return "Password Reset Successfully";
            }
        } catch (Exception e) {
            throw new AuthorizationDeniedException(e);
        }
        return null;
    }

    @Override
    public Response deactiveUser(String realmName, String userId, String token) {
        try {
            if (verifyToken(token)) {
                RealmResource realmResource = keycloak.realm(realmName);
                UserResource userResource = realmResource.users().get(userId);
                UserRepresentation user = userResource.toRepresentation();
                user.setEnabled(false);
                userResource.update(user);
            }
            return Response.ok().build();
        } catch (Exception e) {
            throw new AuthorizationDeniedException(e);
        }
    }

    @Override
    public String getKey(RealmResource realmResource) {
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

        return key;
    }

    private UserDto loadUser(RealmResource realmResource, String userId) {
        UserRepresentation user = realmResource.users().get(userId).toRepresentation();
        Map<String, List<String>> attributes = user.getAttributes();
        UserDto userDto = new UserDto();
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setEmail(user.getEmail());
        userDto.setUserId(user.getId());
        userDto.setUserName(user.getUsername());
        userDto.setAvatarUrl(attributes.get(UserAttributes.AVATAR).get(0));
        userDto.setJobTitle(attributes.get(UserAttributes.JOB_TITLE).get(0));
        userDto.setPhone(attributes.get(UserAttributes.PHONE).get(0));
        userDto.setRoles(user.getRealmRoles());
        SettingsManager settings = new SettingsManager();
        try {
            userDto.setSettings(settings.parseSettings(attributes.get(UserAttributes.SETTINGS).get(0)));
        } catch (IOException e) {
            userDto.setSettings(settings.loadObjectSettingsFromFile());
        }

        return userDto;
    }

    private UserDetailDto loadDetailUser(RealmResource realmResource, String userId) {

        try {
            UserDto userDto = loadUser(realmResource, userId);
            UserDetailDto userDetailDto = new UserDetailDto();
            userDetailDto.setFirstName(userDto.getFirstName());
            userDetailDto.setLastName(userDto.getLastName());
            userDetailDto.setEmail(userDto.getEmail());
            userDetailDto.setUserId(userDto.getUserId());
            userDetailDto.setUserName(userDto.getUserName());
            userDetailDto.setAvatarUrl(userDto.getAvatarUrl());
            userDetailDto.setJobTitle(userDto.getJobTitle());
            userDetailDto.setPhone(userDto.getPhone());
            userDetailDto.setSettings(userDto.getSettings());
            List<RoleRepresentation> roleMappings = realmResource.users().get(userId).roles().realmLevel().listAll();
            List<String> roles = new ArrayList<>();
            List<String> permissions = new ArrayList<>();
            logger.info("Loading " + roleMappings.size() + " Roles For User: " + userDto.getUserName()
                    + " with userId: " + userDto.getUserId());
            for (RoleRepresentation roleRepresentation : roleMappings) {
                String roleName = roleRepresentation.getName();
                roles.add(roleName);
                if (roleRepresentation.isComposite()) {
                    RoleResource roleResource = realmResource.roles().get(roleName);
                    Set<RoleRepresentation> rolePermissions = roleResource.getRoleComposites();
                    for (RoleRepresentation rolePermission : rolePermissions) {
                        permissions.add(rolePermission.getName());
                    }
                }
            }
            userDetailDto.setRoles(roles);
            userDetailDto.setPermissions(permissions);
            return userDetailDto;
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    public String generateToken(UserDetailDto userDetails) {
        Algorithm algorithm = Algorithm.RSA256((RSAPublicKey) keyStore.loadPublicKey(),
                (RSAPrivateKey) keyStore.loadPrivateKey());
        return JWT.create().withClaim("userId", userDetails.getUserId()).withClaim("roles", userDetails.getRoles())
                .withClaim("permissions", userDetails.getPermissions()).withSubject(userDetails.getUserName())
                .withIssuedAt(new Date(System.currentTimeMillis()))
                .withExpiresAt(new Date(System.currentTimeMillis()
                        + Long.parseLong(Objects.requireNonNull(env.getProperty("jwt.expiration.ms")))))
                .sign(algorithm);
    }

    @Override
    public String generateVerifyToken(String userId, String userName, String email, String realmName) {
        Algorithm algorithm = Algorithm.RSA256((RSAPublicKey) keyStore.loadPublicKey(),
                (RSAPrivateKey) keyStore.loadPrivateKey());
        return JWT.create().withClaim("userId", userId).withClaim("userName", userName).withClaim("email", email)
                .withClaim("realmName", realmName).withSubject(userName)
                .withIssuedAt(new Date(System.currentTimeMillis()))
                .withExpiresAt(new Date(System.currentTimeMillis()
                        + Long.parseLong(Objects.requireNonNull(env.getProperty("jwt.expiration.ms")))))
                .sign(algorithm);
    }

    @Override
    public List<SimpleUserDto> getUsers(String realmName, String accessToken) throws AccessDeniedException {
        try {
            RealmResource realmResource = keycloak.realm(realmName);
            PublicKey publicKey = KeyConverter.convertStringToPublicKey(getKey(realmResource));
            AccessToken token = TokenVerifier.create(accessToken, AccessToken.class).publicKey(publicKey).verify()
                    .getToken();
            logger.info("Getting Users");
            if (!token.isActive()) {
                throw new AccessDeniedException("Token is not active");
            }
            if (isUserInRole(realmResource, token.getSubject(), AuthenticationInfo.ADMIN_SETTINGS_PERMISSION)) {
                UsersResource usersResource = realmResource.users();
                List<SimpleUserDto> users = new ArrayList<>();
                List<UserRepresentation> userRepresentations = usersResource.list();
                for (UserRepresentation user : userRepresentations) {
                    SimpleUserDto simpleUserDto = new SimpleUserDto();
                    simpleUserDto.setLastName(user.getLastName());
                    simpleUserDto.setFirstName(user.getFirstName());
                    simpleUserDto.setEmail(user.getEmail());
                    simpleUserDto.setUserId(user.getId());
                    simpleUserDto.setUserName(user.getUsername());
                    simpleUserDto.setAvatarUrl(user.getAttributes().get(UserAttributes.AVATAR).get(0));
                    simpleUserDto.setRoles(getUserRoles(realmResource, user.getId()));
                    users.add(simpleUserDto);
                }
                return users;
            }
            logger.info("The current user doesn't have the required permissions to get users. Needing role: "
                    + AuthenticationInfo.ADMIN_SETTINGS_PERMISSION);
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            throw new AccessDeniedException(e.getMessage());
        }
    }

    @Override
    public SimpleUserDto getUser(String realmName, String userId) throws AccessDeniedException {
        try {
            RealmResource realmResource = keycloak.realm(realmName);
            return loadSimpleUser(realmResource, userId);
        } catch (Exception e) {
            e.printStackTrace();
            throw new AccessDeniedException(e.getMessage());
        }
    }

    private boolean verifyToken(String token) {
        try {
            Algorithm algorithm = Algorithm.RSA256((RSAPublicKey) keyStore.loadPublicKey(),
                    (RSAPrivateKey) keyStore.loadPrivateKey());
            JWT.require(algorithm).build().verify(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private SimpleUserDto loadSimpleUser(RealmResource realmResource, String userId) {

        try {
            SimpleUserDto simpleUserDto = new SimpleUserDto();
            UserRepresentation user = realmResource.users().get(userId).toRepresentation();
            Map<String, List<String>> attributes = user.getAttributes();
            simpleUserDto.setLastName(user.getLastName());
            simpleUserDto.setFirstName(user.getFirstName());
            simpleUserDto.setEmail(user.getEmail());
            simpleUserDto.setUserId(user.getId());
            simpleUserDto.setUserName(user.getUsername());
            simpleUserDto.setAvatarUrl(user.getAttributes().get(UserAttributes.AVATAR).get(0));
            simpleUserDto.setRoles(getUserRoles(realmResource, user.getId()));
            return simpleUserDto;
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    @Override
    public boolean isUserInRole(RealmResource realmResource, String userId, String roleName) {
        logger.info("Checking if user is in role: " + roleName + " with userId: " + userId);
        List<RoleRepresentation> roleMappings = realmResource.users().get(userId).roles().realmLevel().listAll();
        for (RoleRepresentation roleRepresentation : roleMappings) {
            RoleResource roleResource = realmResource.roles().get(roleRepresentation.getName());
            Set<RoleRepresentation> rolePermissions = roleResource.getRoleComposites();
            for (RoleRepresentation rolePermission : rolePermissions) {
                if (rolePermission.getName().equals(roleName)) {
                    return true;
                }
            }
            if (roleRepresentation.getName().equals(roleName)) {
                return true;
            }
        }
        return false;
    }

    private List<String> getUserRoles(RealmResource realmResource, String userId) {
        List<RoleRepresentation> roleMappings = realmResource.users().get(userId).roles().realmLevel().listAll();
        List<String> roles = new ArrayList<>();
        for (RoleRepresentation roleRepresentation : roleMappings) {
            roles.add(roleRepresentation.getName());
        }
        return roles;
    }
}
