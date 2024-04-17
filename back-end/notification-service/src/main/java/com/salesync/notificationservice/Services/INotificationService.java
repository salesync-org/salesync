package com.salesync.notificationservice.Services;

import com.salesync.notificationservice.dtos.MessageDto;
import com.salesync.notificationservice.entities.Message;

import java.util.List;
import java.util.UUID;

public interface INotificationService {

    MessageDto createNotification(MessageDto messageDto);

    void notifyToAllUserInClassroom(MessageDto messageDto);

    void notifyToUser(String userId, MessageDto messageDto);

    List<MessageDto> getUnreadNotificationsByReceiverId(UUID receiverId);

    MessageDto setNotificationAsRead(UUID messageId);

    List<MessageDto> getNotificationsByReceiverId(UUID receiverId);

    List<MessageDto> setAllNotificationsAsReadByReceiverId(UUID receiverId);
}
