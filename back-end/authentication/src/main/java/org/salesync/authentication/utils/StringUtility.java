package org.salesync.authentication.utils;

public final class StringUtility {
    public static String removeBearer(String token) {
        return token.replace("Bearer ", "");
    }
}
