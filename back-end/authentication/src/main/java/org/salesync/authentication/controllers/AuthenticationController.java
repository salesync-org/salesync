package org.salesync.authentication.controllers;

import jakarta.ws.rs.core.Response;
import lombok.AllArgsConstructor;
import org.keycloak.representations.AccessTokenResponse;
import org.salesync.authentication.dtos.CompanyRegisterDTO;
import org.salesync.authentication.dtos.LogInDTO;
import org.salesync.authentication.services.companyregister.IRegisterService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/auth")
@AllArgsConstructor
public class AuthenticationController {
    IRegisterService registerService;

    @PostMapping("/realm/create")
    ResponseEntity<AccessTokenResponse> createRealm(
            @RequestBody CompanyRegisterDTO companyRegisterDTO
    ) {
        return ResponseEntity.ok(registerService.registerCompany(companyRegisterDTO));
    }

    @PostMapping("/{realmId}/login")
    ResponseEntity<AccessTokenResponse> login(
            @PathVariable String realmId,
            @RequestBody LogInDTO loginDTO
    ) {
        return ResponseEntity.ok(registerService.login(loginDTO, "app-admin", "app-admin"));
    }
}
