package org.salesync.authentication.services.register;

import jakarta.ws.rs.core.Response;
import org.hibernate.sql.Update;
import org.keycloak.representations.AccessTokenResponse;
import org.salesync.authentication.dtos.*;

import java.nio.file.AccessDeniedException;

public interface RegisterService {
    AccessTokenResponse registerCompany(CompanyRegisterDto companyRegisterDTO) throws AccessDeniedException;
    Response registerUser(NewUserDto newUserDTO, String realmName, String token) throws AccessDeniedException;
    AccessTokenResponse login(String realmName, LogInDto logInDTO) throws AccessDeniedException;

    Response logout(String realmName, String token);

    VerifyEmailResponseDto verifyEmail(String token);

    UpdateCompanyInfoDto updateCompany(String realmName, UpdateCompanyInfoDto updateCompanyInfoDto, String accessToken) throws AccessDeniedException;
    CompanyInfoDto getCompanyInfo(String companyName, String accessToken) throws AccessDeniedException;
}
