package org.salesync.authentication.utils;

public final class StringUtility {
    public static String removeBearer(String token) {
        return token.replace("Bearer ", "");
    }

    public static String capFirstChar(String value) {
        return value.substring(0, 1).toUpperCase() + value.substring(1);
    }
}
