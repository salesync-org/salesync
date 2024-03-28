package org.salesync.authentication.services.user;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.keycloak.TokenVerifier;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.KeyResource;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.crypto.KeyUse;
import org.keycloak.representations.AccessToken;
import org.keycloak.representations.idm.*;
import org.salesync.authentication.converters.PublicKeyConverter;
import org.salesync.authentication.dtos.UserDto;
import org.salesync.authentication.helpers.SettingsManager;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.PublicKey;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final Keycloak keycloak;
    @Override
    public UserDto validateUser(String realmId, String accessToken) {
        try {
            RealmResource realmResource = keycloak.realm(realmId);
            PublicKey publicKey = PublicKeyConverter.convertStringToPublicKey(getKey(realmResource));
            AccessToken token = TokenVerifier.create(accessToken, AccessToken.class)
                    .publicKey(publicKey) // Set your RSA Public Key
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
    public UserDto modifyInfo(String accessToken, UserDto userDto, String realmId) {
        try {
            RealmResource realmResource = keycloak.realm(realmId);
            PublicKey publicKey = PublicKeyConverter.convertStringToPublicKey(getKey(realmResource));
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
                attributes.put("avatarUrl", List.of(userDto.getAvatarUrl()));
                attributes.put("jobTitle", List.of(userDto.getJobTitle()));
                attributes.put("phone", List.of(userDto.getPhone()));
                attributes.put("settings", List.of(new SettingsManager().updatedSettingsString(userDto.getSettings())));
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
    public UserDto resetSettings(String accessToken, String realmId) {
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
        userDto.setAvatarUrl(attributes.get("avatarUrl").get(0));
        userDto.setJobTitle(attributes.get("jobTitle").get(0));
        userDto.setPhone(attributes.get("phone").get(0));
        userDto.setRoles(user.getRealmRoles());
        SettingsManager settings = new SettingsManager();
        try {
            userDto.setSettings(settings.parseSettings(attributes.get("settings").get(0)));
        } catch (IOException e) {
            userDto.setSettings(settings.loadObjectSettingsFromFile());
        }

        return userDto;
    }

}
