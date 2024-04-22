package org.salesync.authentication.controllers;

import lombok.AllArgsConstructor;
import org.salesync.authentication.constants.Routes;
import org.salesync.authentication.dtos.*;
import org.salesync.authentication.services.role.RoleService;
import org.salesync.authentication.services.user.UserService;
import org.salesync.authentication.utils.StringUtility;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = Routes.ROLE)
@AllArgsConstructor
public class RoleController {
    UserService userService;
    RoleService roleService;


    @GetMapping(Routes.REALM_ROLES)
    ResponseEntity<List<RoleDto>> getRoles(
            @RequestHeader("Authorization") String token,
            @PathVariable String realmName
    ) {
        return ResponseEntity.ok(roleService.getCompositeRoles(realmName, StringUtility.removeBearer(token)));
    }

    @GetMapping(Routes.REALM_ROLE)
    ResponseEntity<RoleDto> loadRole(
            @RequestHeader("Authorization") String token,
            @PathVariable String roleName,
            @PathVariable String realmName
    ) {
        return ResponseEntity.ok(roleService.getRoleDetail(realmName, roleName, StringUtility.removeBearer(token)));
    }

    @GetMapping(Routes.PERMISSIONS)
    ResponseEntity<List<PermissionDto>> getPermissions(
            @PathVariable String realmName,
            @RequestHeader("Authorization") String token
    ) {
        return ResponseEntity.ok(roleService.getPermissions(realmName, StringUtility.removeBearer(token)));
    }

    @PostMapping(Routes.REALM_ROLE)
    ResponseEntity<RoleDto> addRolePermission(
            @PathVariable String realmName,
            @RequestHeader("Authorization") String token,
            @PathVariable String roleName,
            @RequestBody List<String> permissionList
    ) {
        return ResponseEntity.ok(roleService.addPermissionsToRole(realmName, roleName, permissionList, StringUtility.removeBearer(token)));
    }

    @PostMapping(Routes.REALM_ROLES)
    ResponseEntity<RoleDto> createRole(
            @PathVariable String realmName,
            @RequestHeader("Authorization") String token,
            @RequestBody NewRoleDto newRoleDto
    ) {
        return ResponseEntity.ok(roleService.createRole(realmName, newRoleDto, StringUtility.removeBearer(token)));
    }

    @PutMapping(Routes.REALM_ASSIGN_ROLE)
    ResponseEntity<SimpleUserDto> addRoleToUser(
            @PathVariable String realmName,
            @RequestHeader("Authorization") String token,
            @RequestBody AssignRoleDto assignRoleDto
    ) {
        return ResponseEntity.ok(roleService.addRoleToUser(realmName, assignRoleDto.getRoleName(), assignRoleDto.getUserId(), StringUtility.removeBearer(token)));
    }
}
