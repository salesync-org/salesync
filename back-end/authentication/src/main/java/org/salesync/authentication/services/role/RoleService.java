package org.salesync.authentication.services.role;

import org.salesync.authentication.dtos.NewRoleDto;
import org.salesync.authentication.dtos.PermissionDto;
import org.salesync.authentication.dtos.RoleDto;

import java.util.List;

public interface RoleService {
    List<RoleDto> getCompositeRoles(String realmName, String token);

    RoleDto getRoleDetail(String realmName, String roleId, String token);

    List<PermissionDto> getPermissions(String realmName, String token);

    RoleDto addPermissionsToRole(String realmName, String roleId, List<String> permissionNameList, String token);

    RoleDto createRole(String realmName, NewRoleDto newRoleDto, String token);
}
