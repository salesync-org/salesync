package org.salesync.authentication.services.companyregister;

import jakarta.ws.rs.core.Response;
import org.keycloak.representations.AccessTokenResponse;
import org.salesync.authentication.dtos.CompanyRegisterDTO;
import org.salesync.authentication.dtos.LogInDTO;
import org.salesync.authentication.dtos.NewUserDTO;

public interface IRegisterService {
    Response registerCompany(CompanyRegisterDTO companyRegisterDTO);
    Response registerUser(NewUserDTO newUserDTO, String realmName);
    Response login(LogInDTO logInDTO);
}
