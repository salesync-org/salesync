package org.salesync.authentication.services.companyregister;

import jakarta.ws.rs.core.Response;
import org.keycloak.representations.AccessTokenResponse;
import org.salesync.authentication.dtos.CompanyRegisterDTO;
import org.salesync.authentication.dtos.LogInDTO;
import org.salesync.authentication.dtos.NewUserDTO;

public interface IRegisterService {
    AccessTokenResponse registerCompany(CompanyRegisterDTO companyRegisterDTO);
    Response registerUser(NewUserDTO newUserDTO, String realmName, String clientId);
    AccessTokenResponse login(LogInDTO logInDTO, String clientId, String clientSecret);
}
