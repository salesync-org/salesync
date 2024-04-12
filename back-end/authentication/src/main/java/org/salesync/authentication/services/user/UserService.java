package org.salesync.authentication.services.user;
import org.salesync.authentication.dtos.ResetPasswordDto;
import org.salesync.authentication.dtos.UserDetailDto;
import org.salesync.authentication.dtos.UserDto;
import org.salesync.authentication.dtos.ValidationResponseDto;

public interface UserService {
    UserDetailDto validateUser(String realmName, String accessToken);

    UserDto modifyInfo(String accessToken, UserDto userDto, String realmName);

    UserDto resetSettings(String accessToken, String realmName);

    ValidationResponseDto validate(String realmName, String accessToken);

    String resetPassword(String accessToken, String realmName, ResetPasswordDto resetPasswordDto);

    String generateVerifyToken(String userId, String userName, String email, String realmName);
}
