package org.salesync.authentication.controllers;

import jakarta.ws.rs.core.Response;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import org.keycloak.representations.AccessTokenResponse;
import org.salesync.authentication.constants.Routes;
import org.salesync.authentication.dtos.*;
import org.salesync.authentication.services.register.RegisterService;
import org.salesync.authentication.utils.StringUtility;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;

@RestController
@RequestMapping(path = Routes.AUTH)
@AllArgsConstructor
public class AuthenticationController {
    RegisterService registerService;

    @PostMapping(Routes.AUTH_COMPANY_CREATE)
    ResponseEntity<AccessTokenResponse> createRealm(@RequestBody CompanyRegisterDto companyRegisterDTO)
            throws AccessDeniedException {
        return ResponseEntity.ok(registerService.registerCompany(companyRegisterDTO));
    }

    @PutMapping(Routes.AUTH_REALM_INFO)
    ResponseEntity<UpdateCompanyInfoDto> updateRealmInfo(@RequestHeader("Authorization") String token,
            @PathVariable String realmName, @RequestBody UpdateCompanyInfoDto updateCompanyInfoDto) throws Exception {
        return ResponseEntity
                .ok(registerService.updateCompany(realmName, updateCompanyInfoDto, StringUtility.removeBearer(token)));
    }

    @GetMapping(Routes.AUTH_REALM_INFO)
    ResponseEntity<CompanyInfoDto> getRealmInfo(@RequestHeader("Authorization") String token,
            @PathVariable String realmName) throws AccessDeniedException {
        return ResponseEntity.ok(registerService.getCompanyInfo(realmName, StringUtility.removeBearer(token)));
    }

    @PostMapping(Routes.AUTH_LOGIN)
    ResponseEntity<AccessTokenResponse> login(@PathVariable String realmName, @RequestBody LogInDto loginDTO)
            throws AccessDeniedException {
        return ResponseEntity.ok(registerService.login(realmName, loginDTO));
    }

    @GetMapping(Routes.AUTH_VERIFY_EMAIL)
    ResponseEntity<VerifyEmailResponseDto> verifyEmail(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(registerService.verifyEmail(StringUtility.removeBearer(token)));
    }

    @PostMapping(Routes.AUTH_LOGOUT)
    ResponseEntity<Response> logout(@RequestHeader("Authorization") String token, @PathVariable String realmName) {
        return ResponseEntity.ok(registerService.logout(realmName, StringUtility.removeBearer(token)));
    }

    @PostMapping(Routes.AUTH_USER_CREATE)
    ResponseEntity<Response> createUser(@PathVariable String realmName, @RequestHeader("Authorization") String token,
            @RequestBody NewUserDto newUserDTO) throws AccessDeniedException {
        return ResponseEntity
                .ok(registerService.registerUser(newUserDTO, realmName, StringUtility.removeBearer(token)));
    }

}
