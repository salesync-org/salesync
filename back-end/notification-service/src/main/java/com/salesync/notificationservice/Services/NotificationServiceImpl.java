package com.salesync.notificationservice.Services;

import com.salesync.notificationservice.dtos.NotificationDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class NotificationServiceImpl implements INotificationService {

    private final SimpMessagingTemplate simpMessagingTemplate;


    @Override
    public NotificationDto createNotification(NotificationDto notificationDTO) {

        return null;
    }

    @Override
    public void notifyToAllUserInClassroom(NotificationDto notificationDTO) {

    }

    @Override
    public void notifyToUser(String userId, NotificationDto notificationDTO) {
        simpMessagingTemplate.convertAndSendToUser("abc", "/receiver",NotificationDto.builder().content("test").build());
    }

    @Override
    public List<?> getNotifications() {
        return List.of();
    }

    @Override
    public String setAllNotificationsAsRead() {
        return "";
    }
}