package org.salesync.authentication.controllers;

import jakarta.ws.rs.core.Response;
import lombok.AllArgsConstructor;
import org.keycloak.representations.AccessTokenResponse;
import org.salesync.authentication.constants.Routes;
import org.salesync.authentication.dtos.CompanyRegisterDto;
import org.salesync.authentication.dtos.LogInDto;
import org.salesync.authentication.dtos.NewUserDto;
import org.salesync.authentication.services.register.RegisterService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = Routes.AUTH)
@AllArgsConstructor
public class AuthenticationController {
    RegisterService registerService;

    @PostMapping(Routes.AUTH_COMPANY_CREATE)
    ResponseEntity<AccessTokenResponse> createRealm(
            @RequestBody CompanyRegisterDto companyRegisterDTO
    ) {
        return ResponseEntity.ok(registerService.registerCompany(companyRegisterDTO));
    }

    @PostMapping(Routes.AUTH_LOGIN)
    ResponseEntity<AccessTokenResponse> login(
            @PathVariable String realmName,
            @RequestBody LogInDto loginDTO
    ) {
        return ResponseEntity.ok(registerService.login(realmName, loginDTO));
    }

    @PostMapping(Routes.AUTH_LOGOUT)
    ResponseEntity<Response> logout(
            @RequestHeader("Authorization") String token,
            @PathVariable String realmName) {
        return ResponseEntity.ok(registerService.logout(realmName, token));
    }

    @PostMapping(Routes.AUTH_USER_CREATE)
    ResponseEntity<Response> createUser(
            @PathVariable String realmName,
            @RequestBody NewUserDto newUserDTO
            ) {
        return ResponseEntity.ok(registerService.registerUser(newUserDTO, realmName));
    }

}
