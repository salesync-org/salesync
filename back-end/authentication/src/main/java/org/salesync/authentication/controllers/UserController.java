package org.salesync.authentication.controllers;

import lombok.AllArgsConstructor;
import org.salesync.authentication.constants.Routes;
import org.salesync.authentication.dtos.UserDto;
import org.salesync.authentication.dtos.ValidationResponseDto;
import org.salesync.authentication.services.user.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = Routes.USER)
@AllArgsConstructor
public class UserController {
    UserService userService;

    @GetMapping(Routes.USER_VALIDATE)
    ResponseEntity<ValidationResponseDto> validate(
            @RequestHeader String access_token,
            @PathVariable String realmName
    ) {
        return ResponseEntity.ok(userService.validate(realmName, access_token));
    }

    @GetMapping(Routes.USER_LOAD)
    ResponseEntity<UserDto> loadUser(
            @RequestHeader String access_token,
            @PathVariable String realmName
    ) {
        return ResponseEntity.ok(userService.validateUser(realmName, access_token));
    }

    @PutMapping(Routes.USER_MODIFY)
    ResponseEntity<UserDto> modifyInfo(
            @PathVariable String realmName,
            @RequestHeader String access_token,
            @RequestBody UserDto userDto
    ) {
        return ResponseEntity.ok(userService.modifyInfo(access_token, userDto, realmName));
    }

    @PostMapping(Routes.USER_MODIFY_RESET)
    ResponseEntity<UserDto> resetSettings(
            @PathVariable String realmName,
            @RequestHeader String access_token
    ) {
        return ResponseEntity.ok(userService.resetSettings(access_token, realmName));
    }
}
