package org.salesync.authentication.services.role;

import lombok.RequiredArgsConstructor;
import org.apache.http.HttpStatus;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.RoleResource;
import org.keycloak.representations.idm.*;
import org.salesync.authentication.dtos.*;
import org.salesync.authentication.services.user.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.*;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {
    private final Keycloak keycloak;
    private UserService userService;
    Logger logger = LoggerFactory.getLogger(RoleServiceImpl.class);

    @Autowired
    public RoleServiceImpl(Keycloak keycloak, UserService userService) {
        this.keycloak = keycloak;
        this.userService = userService;
    }


    @Override
    public List<RoleDto> getCompositeRoles(String realmName, String token) {
        try {
            if (userService.validate(realmName, token) != null) {
                RealmResource realmResource = keycloak.realm(realmName);
                List<RoleDto> roleDtoList = new ArrayList<>();
                List<RoleRepresentation> roleRepresentationList = realmResource.roles().list();
                for (RoleRepresentation roleRepresentation : roleRepresentationList) {
                    if (!roleRepresentation.isComposite() ||
                        roleRepresentation.getName().equals("offline_access") ||
                            roleRepresentation.getName().equals("uma_authorization")) {
                        continue;
                    }
                    roleDtoList.add(getRoleDto(realmResource.roles().get(roleRepresentation.getName())));
                }
                return roleDtoList;
            } else {
                throw HttpClientErrorException.Unauthorized.create(
                        HttpStatusCode.valueOf(HttpStatus.SC_UNAUTHORIZED), "Unauthorized", null, null, null);
            }
        } catch (HttpClientErrorException.Unauthorized e) {
            logger.error("Unauthorized access");
            e.printStackTrace();
            throw e;
        } catch (Exception e) {
            logger.error("Error occurred while fetching roles");
            e.printStackTrace();
            throw e;
        }
    }

    @Override
    public RoleDto getRoleDetail(String realmName, String roleName, String token) {
        try {
            if (userService.validate(realmName, token) != null) {
                RealmResource realmResource = keycloak.realm(realmName);
                return getRoleDto(realmResource.roles().get(roleName));
            } else {
                throw HttpClientErrorException.Unauthorized.create(
                        HttpStatusCode.valueOf(HttpStatus.SC_UNAUTHORIZED),
                        "Unauthorized", null, null, null);
            }
        } catch (HttpClientErrorException.Unauthorized e) {
            logger.error("Unauthorized access");
            e.printStackTrace();
            throw e;
        } catch (Exception e) {
            logger.error("Error occurred while fetching role details");
            e.printStackTrace();
            throw e;
        }
    }

    @Override
    public List<PermissionDto> getPermissions(String realmName, String token) {
        try {
            if (userService.validate(realmName, token) != null) {
                RealmResource realmResource = keycloak.realm(realmName);
                List<PermissionDto> permissionList = new ArrayList<>();
                List<RoleRepresentation> roleRepresentationList = realmResource.roles().list();
                for (RoleRepresentation roleRepresentation : roleRepresentationList) {
                    if (roleRepresentation.isComposite() ||
                            roleRepresentation.getName().equals("offline_access") ||
                            roleRepresentation.getName().equals("uma_authorization")) {
                        continue;
                    }
                    permissionList.add(getPermissionDto(realmResource.roles().
                            get(roleRepresentation.getName())));
                }
                return permissionList;
            } else {
                throw HttpClientErrorException.Unauthorized.create(
                        HttpStatusCode.valueOf(HttpStatus.SC_UNAUTHORIZED),
                        "Unauthorized", null, null, null);
            }
        } catch (HttpClientErrorException.Unauthorized e) {
            logger.error("Unauthorized access");
            e.printStackTrace();
            throw e;
        } catch (Exception e) {
            logger.error("Error occurred while fetching permissions");
            e.printStackTrace();
            throw e;
        }
    }

    @Override
    public RoleDto addPermissionsToRole(String realmName, String roleName, List<String> permissionList, String token) {
        try {
            if (userService.validate(realmName, token) != null) {
                RealmResource realmResource = keycloak.realm(realmName);
                RoleResource roleResource = realmResource.roles().get(roleName);
                Set<RoleRepresentation> permissionRoles = new HashSet<>();
                for (String permissionName : permissionList) {
                    permissionRoles.add(realmResource.roles().get(permissionName).toRepresentation());
                }
                roleResource.addComposites(permissionRoles.stream().toList());
                return getRoleDto(roleResource);
            } else {
                throw HttpClientErrorException.Unauthorized.create(
                        HttpStatusCode.valueOf(HttpStatus.SC_UNAUTHORIZED),
                        "Unauthorized", null, null, null);
            }
        } catch (HttpClientErrorException.Unauthorized e) {
            logger.error("Unauthorized access");
            e.printStackTrace();
            throw e;
        } catch (Exception e) {
            logger.error("Error occurred while fetching permissions");
            e.printStackTrace();
            throw e;
        }
    }

    @Override
    public RoleDto createRole(String realmName, NewRoleDto newRoleDto, String token) {
        try {
            RealmResource realmResource = keycloak.realm(realmName);
            RoleRepresentation roleRepresentation = new RoleRepresentation();
            roleRepresentation.setName(newRoleDto.getRoleName());
            roleRepresentation.setDescription(newRoleDto.getDescription());
            roleRepresentation.setComposite(true);
            realmResource.roles().create(roleRepresentation);
            return getRoleDto(realmResource.roles().get(roleRepresentation.getName()));
        } catch (Exception e) {
            logger.error("Error occurred while creating role");
            e.printStackTrace();
            throw e;
        }
    }

    private RoleDto getRoleDto(RoleResource roleResource) {
        RoleRepresentation roleRepresentation = roleResource.toRepresentation();
        RoleDto roleDto = new RoleDto();
        roleDto.setRoleId(roleRepresentation.getId());
        roleDto.setRoleName(roleRepresentation.getName());
        roleDto.setDescription(roleRepresentation.getDescription());
        Set<RoleRepresentation> permissionRoles = roleResource.getRoleComposites();
        roleDto.setPermissions(getRolePermissions(permissionRoles));
        return roleDto;
    }

    private PermissionDto getPermissionDto(RoleResource roleResource) {
        RoleRepresentation roleRepresentation = roleResource.toRepresentation();
        PermissionDto permissionDto = new PermissionDto();
        permissionDto.setPermissionId(roleRepresentation.getId());
        permissionDto.setPermissionName(roleRepresentation.getName());
        permissionDto.setDescription(roleRepresentation.getDescription());
        return permissionDto;
    }

    private Set<PermissionDto> getRolePermissions(Set<RoleRepresentation> roleRepresentations) {
        Set<PermissionDto> permissions = new HashSet<>();
        for (RoleRepresentation roleRepresentation : roleRepresentations) {
            if (roleRepresentation.isComposite() ||
                    roleRepresentation.getName().equals("offline_access") ||
                    roleRepresentation.getName().equals("uma_authorization")) {
                continue;
            }
            PermissionDto permissionDto = new PermissionDto();
            permissionDto.setPermissionId(roleRepresentation.getId());
            permissionDto.setPermissionName(roleRepresentation.getName());
            permissionDto.setDescription(roleRepresentation.getDescription());
            permissions.add(permissionDto);
        }
        return permissions;
    }
}
