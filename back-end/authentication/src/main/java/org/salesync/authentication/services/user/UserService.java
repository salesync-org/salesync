package org.salesync.authentication.services.user;
import org.salesync.authentication.dtos.UserDto;

public interface UserService {
    UserDto validateUser(String realmId, String accessToken);

    UserDto modifyInfo(String accessToken, UserDto userDto, String realmId);

    UserDto resetSettings(String accessToken, String realmId);
}
