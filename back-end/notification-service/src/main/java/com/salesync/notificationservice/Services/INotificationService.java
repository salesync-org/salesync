package com.salesync.notificationservice.Services;

import com.salesync.notificationservice.dtos.MessageDto;
import com.salesync.notificationservice.entities.Message;

import java.util.List;

public interface INotificationService {

    MessageDto createNotification(MessageDto messageDto);

    void notifyToAllUserInClassroom(MessageDto messageDto);

    void notifyToUser(String userId, MessageDto messageDto);

    List<?> getNotifications();

    String setAllNotificationsAsRead();
}
