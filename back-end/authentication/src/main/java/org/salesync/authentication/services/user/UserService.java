package org.salesync.authentication.services.user;

import jakarta.ws.rs.core.Response;
import org.keycloak.representations.AccessTokenResponse;
import org.salesync.authentication.dtos.CompanyRegisterDto;
import org.salesync.authentication.dtos.LogInDto;
import org.salesync.authentication.dtos.NewUserDto;
import org.salesync.authentication.dtos.UserDto;

public interface UserService {
    UserDto validateUser(String realmId, String accessToken);

    UserDto modifyInfo(String accessToken, UserDto userDto, String realmId);

    UserDto resetSettings(String accessToken, String realmId);
}
