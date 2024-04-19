package org.salesync.authentication.constants;

public final class Routes {
    private Routes() { }
    public static final String REALM = "/{realmName}";
//    public static final String USER = "/user";
    public static final String USER_DETAIL = "/user/{userId}";
    public static final String USERS = "/users";
    public static final String USER_VALIDATE = "/user/validate";
    public static final String USER_LOAD = "/user";
    public static final String USER_RESET_PASSWORD = "/user/password";
    public static final String USER_MODIFY = "/user";
    public static final String USER_MODIFY_RESET = "/user/reset";
    public static final String AUTH = "/";
    public static final String AUTH_VERIFY_EMAIL = "/verify-email";
    public static final String AUTH_COMPANY_CREATE = "/create";
    public static final String AUTH_LOGIN = "/{realmName}/login";
    public static final String AUTH_LOGOUT = "/{realmName}/logout";
    public static final String AUTH_USER_CREATE = "/{realmName}/user/create";
    public static final String AUTH_REALM_INFO = "/{realmName}/info";
    public static final String ROLE = "/";
    public static final String REALM_ROLES = "/{realmName}/roles";
    public static final String REALM_ROLE = "/{realmName}/role/{roleName}";
    public static final String REALM_ASSIGN_ROLE = "/{realmName}/role/assign";
    public static final String PERMISSIONS = "/{realmName}/permissions";
}
