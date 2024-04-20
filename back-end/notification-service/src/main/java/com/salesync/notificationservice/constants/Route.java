package com.salesync.notificationservice.constants;

public final class Route {


    public static final class Notification {
        public static final String NOTIFICATION_ROUTE = "/notifications";
        public static final String NOTIFICATION_ID = "/{notificationId}";
        public static final String GET_NOTIFICATIONS_BY_RECEIVER_ID = "/{receiverId}";
        public static final String GET_UNREAD_NOTIFICATIONS_BY_RECEIVER_ID = "/unread/{receiverId}";
        public static final String SET_NOTIFICATION_AS_READ = "/set-read/{notificationId}";
        public static final String SET_ALL_NOTIFICATIONS_AS_READ = "/set-all-read/{receiverId}";
    }
}
