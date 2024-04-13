package org.salesync.authentication.services.register;

import jakarta.ws.rs.core.Response;
import org.keycloak.representations.AccessTokenResponse;
import org.salesync.authentication.dtos.*;

public interface RegisterService {
    AccessTokenResponse registerCompany(CompanyRegisterDto companyRegisterDTO);
    Response registerUser(NewUserDto newUserDTO, String realmName, String token);
    AccessTokenResponse login(String realmName, LogInDto logInDTO);

    Response logout(String realmName, String token);

    VerifyEmailResponseDto verifyEmail(String token);
}
