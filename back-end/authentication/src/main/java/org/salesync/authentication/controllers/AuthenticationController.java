package org.salesync.authentication.controllers;

import jakarta.ws.rs.core.Response;
import org.keycloak.representations.AccessTokenResponse;
import org.salesync.authentication.dtos.CompanyRegisterDTO;
import org.salesync.authentication.services.companyregister.IRegisterService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/auth")
public class AuthenticationController {
    IRegisterService registerService;

    @PostMapping("/realm/create")
    ResponseEntity<Response> createRealm(
            @RequestBody CompanyRegisterDTO companyRegisterDTO
    ) {
        return ResponseEntity.ok(registerService.registerCompany(companyRegisterDTO));
    }
}
