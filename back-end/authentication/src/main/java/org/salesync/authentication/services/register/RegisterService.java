package org.salesync.authentication.services.register;

import jakarta.ws.rs.core.Response;
import org.keycloak.representations.AccessTokenResponse;
import org.salesync.authentication.dtos.CompanyRegisterDto;
import org.salesync.authentication.dtos.LogInDto;
import org.salesync.authentication.dtos.NewUserDto;
import org.salesync.authentication.dtos.UserDto;

public interface RegisterService {
    AccessTokenResponse registerCompany(CompanyRegisterDto companyRegisterDTO);
    Response registerUser(NewUserDto newUserDTO, String realmName, String clientId);
    AccessTokenResponse login(String realmName, LogInDto logInDTO, String clientId, String clientSecret);

    Response logout(String token);
}
