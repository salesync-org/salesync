package org.salesync.authentication.constants;

public final class AuthenticationInfo {
    private AuthenticationInfo() { }
    public static final String DEFAULT_PASSWORD = "admin";
    public static final String STANDARD_ROLE = "standard-user";
    public static final String ADMIN_ROLE = "admin-user";
    public static final int EMAIL_SENDING_ATTEMPT = 3;
    public static final int RETRY_ATTEMPT_DELAY_SECOND = 5;
}
