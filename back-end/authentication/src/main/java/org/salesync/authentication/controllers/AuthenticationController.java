package org.salesync.authentication.controllers;

import jakarta.ws.rs.core.Response;
import lombok.AllArgsConstructor;
import org.keycloak.representations.AccessTokenResponse;
import org.salesync.authentication.dtos.CompanyRegisterDto;
import org.salesync.authentication.dtos.LogInDto;
import org.salesync.authentication.dtos.NewUserDto;
import org.salesync.authentication.services.companyregister.RegisterService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/auth")
@AllArgsConstructor
public class AuthenticationController {
    RegisterService registerService;

    @PostMapping("/realm/create")
    ResponseEntity<AccessTokenResponse> createRealm(
            @RequestBody CompanyRegisterDto companyRegisterDTO
    ) {
        return ResponseEntity.ok(registerService.registerCompany(companyRegisterDTO));
    }

    @PostMapping("/{realmId}/login")
    ResponseEntity<AccessTokenResponse> login(
            @PathVariable String realmId,
            @RequestBody LogInDto loginDTO
    ) {
        return ResponseEntity.ok(registerService.login(realmId, loginDTO, "app-admin", "app-admin"));
    }

    @GetMapping("/{realmId}/loaduser")
    ResponseEntity<AccessTokenResponse> loadUser(
            @RequestHeader String access_token,
            @PathVariable String realmId
    ) {
        return ResponseEntity.ok(registerService.validate(realmId, access_token));
    }

    @PostMapping("/{realmId}/logout")
    ResponseEntity<Response> logout(
            @RequestHeader("Authorization") String token
    ) {
        return ResponseEntity.ok(registerService.logout(token));
    }

    @PostMapping("/{realmId}/user/create")
    ResponseEntity<Response> createUser(
            @PathVariable String realmId,
            @RequestBody NewUserDto newUserDTO
            ) {
        return ResponseEntity.ok(registerService.registerUser(newUserDTO, realmId, "app-admin"));
    }

}
