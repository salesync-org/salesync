package org.salesync.authentication.constants;

public final class Routes {
    private Routes() { }
    public static final String USER = "/user";
    public static final String USER_VALIDATE = "/{realmName}/validate";
    public static final String USER_LOAD = "/{realmName}";
    public static final String USER_MODIFY = "/{realmName}";
    public static final String USER_MODIFY_RESET = "/{realmName}/reset";
    public static final String AUTH = "/auth";
    public static final String AUTH_COMPANY_CREATE = "/create";
    public static final String AUTH_LOGIN = "/{realmName}/login";
    public static final String AUTH_LOGOUT = "/{realmName}/logout";
    public static final String AUTH_USER_CREATE = "/{realmName}/user/create";
}
