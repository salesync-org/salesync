package com.salesync.typeservice.constants;

public enum PermissionType {
    EDIT_OWN("edit-own"), EDIT_ALL("edit-all"), READ_OWN("read-own"), READ_ALL("read-all"), DELETE_OWN("delete-own"), DELETE_ALL("delete-all"), ADMIN_SETTINGS("admin-settings"), CREATE("create");

    private final String permission;

    PermissionType(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}
