package org.salesync.authentication.services.register;

import jakarta.ws.rs.core.Response;
import org.keycloak.representations.AccessTokenResponse;
import org.salesync.authentication.dtos.CompanyRegisterDto;
import org.salesync.authentication.dtos.LogInDto;
import org.salesync.authentication.dtos.NewUserDto;

public interface RegisterService {
    AccessTokenResponse registerCompany(CompanyRegisterDto companyRegisterDTO);
    Response registerUser(NewUserDto newUserDTO, String realmName);
    AccessTokenResponse login(String realmName, LogInDto logInDTO);

    Response logout(String realmName, String token);
}
