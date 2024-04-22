package org.salesync.authentication.controllers;

import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import org.salesync.authentication.constants.Routes;
import org.salesync.authentication.dtos.*;
import org.salesync.authentication.services.user.UserService;
import org.salesync.authentication.utils.StringUtility;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;

@RestController
@RequestMapping(path = Routes.REALM)
@AllArgsConstructor
public class UserController {
    UserService userService;

    @SneakyThrows
    @GetMapping(Routes.USER_VALIDATE)
    ResponseEntity<ValidationResponseDto> validate(
            @RequestHeader("Authorization") String token,
            @PathVariable String realmName
    ) {
        return ResponseEntity.ok(userService.validate(realmName, StringUtility.removeBearer(token)));
    }

    @SneakyThrows
    @GetMapping(Routes.USER_LOAD)
    ResponseEntity<UserDetailDto> loadUser(
            @RequestHeader("Authorization") String token,
            @PathVariable String realmName
    ) {
        return ResponseEntity.ok(userService.validateUser(realmName, StringUtility.removeBearer(token)));
    }

    @SneakyThrows
    @PutMapping(Routes.USER_MODIFY)
    ResponseEntity<UserDto> modifyInfo(
            @PathVariable String realmName,
            @RequestHeader("Authorization") String token,
            @RequestBody UserDto userDto
    ) {
        return ResponseEntity.ok(userService.modifyInfo(StringUtility.removeBearer(token), userDto, realmName));
    }

    @SneakyThrows
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

    @SneakyThrows
    @GetMapping(Routes.USERS)
    ResponseEntity<List<SimpleUserDto>> getUsers(
            @RequestHeader("Authorization") String token,
            @PathVariable String realmName
    ) {
        return ResponseEntity.ok(userService.getUsers(realmName, StringUtility.removeBearer(token)));
    }

    @SneakyThrows
    @GetMapping(Routes.USER_DETAIL)
    ResponseEntity<SimpleUserDto> getSimpleUser(
            @PathVariable String realmName,
            @PathVariable String userId
    ) {
        return ResponseEntity.ok(userService.getUser(realmName, userId));
    }
}
