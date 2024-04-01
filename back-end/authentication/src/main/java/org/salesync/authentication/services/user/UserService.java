package org.salesync.authentication.services.user;
import org.salesync.authentication.dtos.UserDto;
import org.salesync.authentication.dtos.ValidationResponseDto;

public interface UserService {
    UserDto validateUser(String realmName, String accessToken);

    UserDto modifyInfo(String accessToken, UserDto userDto, String realmName);

    UserDto resetSettings(String accessToken, String realmName);

    ValidationResponseDto validate(String realmName, String accessToken);
}
