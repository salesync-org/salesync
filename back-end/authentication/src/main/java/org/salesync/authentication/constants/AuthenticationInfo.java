package org.salesync.authentication.constants;

public final class AuthenticationInfo {
    private AuthenticationInfo() {
    }

    public static final String DEFAULT_PASSWORD = "admin";
    public static final String STANDARD_ROLE = "standard-user";
    public static final String ADMIN_ROLE = "admin-user";
    public static final String READ_OWN_PERMISSION = "read-own";
    public static final String READ_ALL_PERMISSION = "read-all";
    public static final String EDIT_OWN_PERMISSION = "edit-own";
    public static final String EDIT_ALL_PERMISSION = "edit-all";
    public static final String DELETE_OWN_PERMISSION = "delete-own";
    public static final String DELETE_ALL_PERMISSION = "delete-all";
    public static final String CREATE_PERMISSION = "create";
    public static final String ADMIN_SETTINGS_PERMISSION = "admin-settings";
    public static final int EMAIL_SENDING_ATTEMPT = 3;
    public static final int RETRY_ATTEMPT_DELAY_SECOND = 5;
}
