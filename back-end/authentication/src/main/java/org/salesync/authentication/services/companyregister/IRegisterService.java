package org.salesync.authentication.services.companyregister;

import jakarta.ws.rs.core.Response;
import org.keycloak.representations.AccessTokenResponse;
import org.keycloak.representations.JsonWebToken;
import org.salesync.authentication.dtos.CompanyRegisterDto;
import org.salesync.authentication.dtos.LogInDto;
import org.salesync.authentication.dtos.NewUserDto;

public interface IRegisterService {
    AccessTokenResponse registerCompany(CompanyRegisterDto companyRegisterDTO);
    Response registerUser(NewUserDto newUserDTO, String realmName, String clientId);
    AccessTokenResponse login(String realmName, LogInDto logInDTO, String clientId, String clientSecret);

    Response logout(String token);

    AccessTokenResponse validate(String realmId, String accessToken);
}
