package com.salesync.notificationservice.controllers;

import com.salesync.notificationservice.Services.INotificationService;
import com.salesync.notificationservice.constants.Route;
import com.salesync.notificationservice.dtos.MessageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;


import java.util.List;
import java.util.UUID;

@RestController
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
@RequestMapping(Route.Notification.NOTIFICATION_ROUTE)
public class NotificationController {

    private final INotificationService notificationService;

    @GetMapping(Route.Notification.GET_NOTIFICATIONS_BY_RECEIVER_ID)
    ResponseEntity<List<MessageDto>> getNotifications(@PathVariable UUID receiverId) {
        return ResponseEntity.ok(notificationService.getNotificationsByReceiverId(receiverId));}


    @GetMapping(Route.Notification.GET_UNREAD_NOTIFICATIONS_BY_RECEIVER_ID)
    ResponseEntity<List<MessageDto>> getUnreadNotifications(@PathVariable UUID receiverId) {
        return ResponseEntity.ok(notificationService.getUnreadNotificationsByReceiverId(receiverId));
    }

    @PutMapping(Route.Notification.SET_NOTIFICATION_AS_READ)
    ResponseEntity<MessageDto> setNotificationAsRead(@PathVariable UUID notificationId) {
        return ResponseEntity.ok(notificationService.setNotificationAsRead(notificationId));
    }

    @PutMapping(Route.Notification.SET_ALL_NOTIFICATIONS_AS_READ)
    ResponseEntity<List<MessageDto>> setAllNotificationsAsRead(@PathVariable UUID receiverId) {
        return ResponseEntity.ok(notificationService.setAllNotificationsAsReadByReceiverId(receiverId));
    }
}
