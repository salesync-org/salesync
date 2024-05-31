package org.salesync.authentication.services.user;

import jakarta.ws.rs.core.Response;
import org.keycloak.admin.client.resource.RealmResource;
import org.salesync.authentication.dtos.*;

import java.nio.file.AccessDeniedException;
import java.util.List;

public interface UserService {
    UserDetailDto validateUser(String realmName, String accessToken) throws AccessDeniedException;

    UserDto modifyInfo(String accessToken, UserDto userDto, String realmName) throws AccessDeniedException;

    UserDto resetSettings(String accessToken, String realmName) throws AccessDeniedException;

    ValidationResponseDto validate(String realmName, String accessToken) throws AccessDeniedException;

    String resetPassword(String accessToken, String realmName, ResetPasswordDto resetPasswordDto);

    Response deactiveUser(String realmName, String userId, String token);

    String generateVerifyToken(String userId, String userName, String email, String realmName);

    List<SimpleUserDto> getUsers(String realmName, String token) throws AccessDeniedException;

    SimpleUserDto getUser(String realmName, String userId) throws AccessDeniedException;

    boolean isUserInRole(RealmResource realmResource, String userId, String roleName);

    String getKey(RealmResource realmResource);
}
