package org.salesync.authentication.controllers;

import lombok.AllArgsConstructor;
import org.salesync.authentication.constants.Routes;
import org.salesync.authentication.dtos.ResetPasswordDto;
import org.salesync.authentication.dtos.UserDetailDto;
import org.salesync.authentication.dtos.UserDto;
import org.salesync.authentication.dtos.ValidationResponseDto;
import org.salesync.authentication.services.user.UserService;
import org.salesync.authentication.utils.StringUtility;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = Routes.REALM + Routes.USER)
@AllArgsConstructor
public class UserController {
    UserService userService;

    @GetMapping(Routes.USER_VALIDATE)
    ResponseEntity<ValidationResponseDto> validate(
            @RequestHeader("Authorization") String token,
            @PathVariable String realmName
    ) {
        return ResponseEntity.ok(userService.validate(realmName, StringUtility.removeBearer(token)));
    }

    @GetMapping(Routes.USER_LOAD)
    ResponseEntity<UserDetailDto> loadUser(
            @RequestHeader("Authorization") String token,
            @PathVariable String realmName
    ) {
        return ResponseEntity.ok(userService.validateUser(realmName, StringUtility.removeBearer(token)));
    }

    @PutMapping(Routes.USER_MODIFY)
    ResponseEntity<UserDto> modifyInfo(
            @PathVariable String realmName,
            @RequestHeader("Authorization") String token,
            @RequestBody UserDto userDto
    ) {
        return ResponseEntity.ok(userService.modifyInfo(StringUtility.removeBearer(token), userDto, realmName));
    }

    @PostMapping(Routes.USER_MODIFY_RESET)
    ResponseEntity<UserDto> resetSettings(
            @PathVariable String realmName,
            @RequestHeader("Authorization") String token
    ) {
        return ResponseEntity.ok(userService.resetSettings(StringUtility.removeBearer(token), realmName));
    }

    @PutMapping(Routes.USER_RESET_PASSWORD)
    ResponseEntity<String> resetPassword(
            @PathVariable String realmName,
            @RequestHeader("Authorization") String token,
            @RequestBody ResetPasswordDto resetPasswordDto

            ) {
        return ResponseEntity.ok(userService.resetPassword(StringUtility.removeBearer(token), realmName, resetPasswordDto));
    }
}
