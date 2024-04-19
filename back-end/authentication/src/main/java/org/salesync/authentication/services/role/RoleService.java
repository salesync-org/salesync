package org.salesync.authentication.services.role;

import org.salesync.authentication.dtos.*;

import java.util.List;

public interface RoleService {
    List<RoleDto> getCompositeRoles(String realmName, String token);

    RoleDto getRoleDetail(String realmName, String roleId, String token);

    List<PermissionDto> getPermissions(String realmName, String token);

    RoleDto addPermissionsToRole(String realmName, String roleId, List<String> permissionNameList, String token);

    RoleDto createRole(String realmName, NewRoleDto newRoleDto, String token);

    SimpleUserDto addRoleToUser(String realmName, String roleName, String userId, String token);
}
