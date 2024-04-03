package org.salesync.authentication.services.user;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import lombok.RequiredArgsConstructor;
import org.keycloak.TokenVerifier;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.KeyResource;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.crypto.KeyUse;
import org.keycloak.representations.AccessToken;
import org.keycloak.representations.idm.*;
import org.salesync.authentication.configurations.KeyStoreConfig;
import org.salesync.authentication.constants.UserAttributes;
import org.salesync.authentication.converters.KeyConverter;
import org.salesync.authentication.dtos.UserDto;
import org.salesync.authentication.dtos.ValidationResponseDto;
import org.salesync.authentication.helpers.SettingsManager;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.PublicKey;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final Keycloak keycloak;
    private final KeyStoreConfig keyStore;
    private final Environment env;
    @Override
    public UserDto validateUser(String realmName, String accessToken) {
        try {
            RealmResource realmResource = keycloak.realm(realmName);
            PublicKey publicKey = KeyConverter.convertStringToPublicKey(getKey(realmResource));
            AccessToken token = TokenVerifier.create(accessToken, AccessToken.class)
                    .publicKey(publicKey)
                    .verify()
                    .getToken();
            if (token.isActive()) {
                String userId = token.getSubject();
                return loadUser(realmResource, userId);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return null;
    }

    @Override
    public UserDto modifyInfo(String accessToken, UserDto userDto, String realmName) {
        try {
            RealmResource realmResource = keycloak.realm(realmName);
            PublicKey publicKey = KeyConverter.convertStringToPublicKey(getKey(realmResource));
            AccessToken token = TokenVerifier.create(accessToken, AccessToken.class)
                    .publicKey(publicKey) // Set your RSA Public Key
                    .verify()
                    .getToken();
            if (token.isActive()) {
                String userId = token.getSubject();
                UserRepresentation user = realmResource.users().get(userId).toRepresentation();
                user.setFirstName(userDto.getFirstName());
                user.setLastName(userDto.getLastName());
                Map<String, List<String>> attributes = user.getAttributes();
                attributes.put(UserAttributes.AVATAR, List.of(userDto.getAvatarUrl()));
                attributes.put(UserAttributes.JOB_TITLE, List.of(userDto.getJobTitle()));
                attributes.put(UserAttributes.PHONE, List.of(userDto.getPhone()));
                attributes.put(UserAttributes.SETTINGS, List.of(new SettingsManager().updatedSettingsString(userDto.getSettings())));
                user.setAttributes(attributes);
                realmResource.users().get(userId).update(user);
                return loadUser(realmResource, userId);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return null;
    }

    @Override
    public UserDto resetSettings(String accessToken, String realmName) {
        try {
            RealmResource realmResource = keycloak.realm(realmName);
            PublicKey publicKey = KeyConverter.convertStringToPublicKey(getKey(realmResource));
            AccessToken token = TokenVerifier.create(accessToken, AccessToken.class)
                    .publicKey(publicKey) // Set your RSA Public Key
                    .verify()
                    .getToken();
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
            throw new RuntimeException(e);
        }
        return null;
    }

    @Override
    public ValidationResponseDto validate(String realmName, String accessToken) {
        try {
            RealmResource realmResource = keycloak.realm(realmName);
            PublicKey publicKey = KeyConverter.convertStringToPublicKey(getKey(realmResource));
            AccessToken token = TokenVerifier.create(accessToken, AccessToken.class)
                    .publicKey(publicKey)
                    .verify()
                    .getToken();
            if (token.isActive()) {
                String responseToken = generateToken(loadUser(realmResource, token.getSubject()));
                ValidationResponseDto response = new ValidationResponseDto();
                response.setToken(responseToken);
                return response;
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return null;
    }

    private String getKey(RealmResource realmResource) {
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

    public String generateToken(UserDto userDetails) {
        Algorithm algorithm = Algorithm.RSA256(
                (RSAPublicKey) keyStore.loadPublicKey(),
                (RSAPrivateKey) keyStore.loadPrivateKey());
        return JWT.create()
                .withClaim("userId", userDetails.getUserId())
                .withClaim("roles", userDetails.getRoles())
                .withSubject(userDetails.getUserName())
                .withIssuedAt(new Date(System.currentTimeMillis()))
                .withExpiresAt(new Date(System.currentTimeMillis()
                        + Long.parseLong(Objects.requireNonNull(
                                env.getProperty("jwt.expiration.ms")))))
                        .sign(algorithm);
    }
}
