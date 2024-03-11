package org.salesync.authentication.controllers;

import org.jboss.resteasy.annotations.ResponseObject;
import org.keycloak.admin.client.Keycloak;
import org.salesync.authentication.utils.KeyCloakUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.boot.actuate.endpoint.web.WebEndpointResponse.*;

@RestController
@RequestMapping(path = "/keycloak")
public class AuthenticationController {
    @Autowired
    Environment env;

    @GetMapping("/users")
    ResponseEntity<String> getAllUsers(
            @RequestParam(required = false) String username
    ) {
        System.out.println("Checking 1");
        KeyCloakUtils keycloakUtils = new KeyCloakUtils(env);
        System.out.println("Checking 2");
        Keycloak keycloak = keycloakUtils.getKeycloakInstance();
        System.out.println("Checking 3");
        try {

//            if (response.getStatus() == HttpStatus.CREATED.value()) {
//                return ResponseEntity.status(HttpStatus.OK).body(
//                        new ResponseObject(STATUS_OK, "Success", user));
//            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (keycloak != null) {
                keycloak.close();
            }
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    @GetMapping("/get-one")
    public String getOneRelation(){
        return "One Relation";
    }
}
