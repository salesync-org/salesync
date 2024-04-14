package com.salesync.notificationservice.Services;

import com.salesync.notificationservice.dtos.NotificationDto;

import java.util.List;

public interface INotificationService {

    NotificationDto createNotification(NotificationDto notificationDTO);

    void notifyToAllUserInClassroom(NotificationDto notificationDTO);

    void notifyToUser(String userId, NotificationDto notificationDTO);

    List<?> getNotifications();

    String setAllNotificationsAsRead();
}
