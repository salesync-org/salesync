package org.salesync.authentication.controllers;

import jakarta.ws.rs.core.Response;
import lombok.AllArgsConstructor;
import org.salesync.authentication.dtos.NewUserDto;
import org.salesync.authentication.dtos.UserDto;
import org.salesync.authentication.services.register.RegisterService;
import org.salesync.authentication.services.user.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/user")
@AllArgsConstructor
public class UserController {
    UserService userService;

    @GetMapping("/{realmId}/loaduser")
    ResponseEntity<UserDto> loadUser(
            @RequestHeader String access_token,
            @PathVariable String realmId
    ) {
        return ResponseEntity.ok(userService.validateUser(realmId, access_token));
    }

    @PostMapping("/{realmId}/user/modify")
    ResponseEntity<UserDto> modifyInfo(
            @PathVariable String realmId,
            @RequestHeader String access_token,
            @RequestBody UserDto userDto
    ) {
        return ResponseEntity.ok(userService.modifyInfo(access_token, userDto, realmId));
    }

    @PostMapping("/{realmId}/user/modify/reset")
    ResponseEntity<UserDto> resetSettings(
            @PathVariable String realmId,
            @RequestHeader String access_token
    ) {
        return ResponseEntity.ok(userService.resetSettings(access_token, realmId));
    }
}
