package com.salesync.notificationservice.controllers;


import com.salesync.notificationservice.Services.INotificationService;
import com.salesync.notificationservice.dtos.MessageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.util.HtmlUtils;

import java.util.List;
import java.util.UUID;

@RestController
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class NotificationController {

    private final INotificationService notificationService;

    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public String greeting(String message) throws Exception {
        Thread.sleep(5000); // simulated delay
        System.out.println("Message: " + message);
        return "Hello, " + HtmlUtils.htmlEscape("hiii") + "!";
    }

    @GetMapping("/send-notification")
    String sendNotification() {
        notificationService.notifyToUser("abc", null);
        return "ok";
    }

    @GetMapping("/notifications/{receiverId}")
    ResponseEntity<List<MessageDto>> getNotifications(@PathVariable UUID receiverId) {
        return ResponseEntity.ok(notificationService.getNotificationsByReceiverId(receiverId));
    }

    @GetMapping("/unread-notifications/{receiverId}")
    ResponseEntity<List<MessageDto>> getUnreadNotifications(@PathVariable UUID receiverId) {
        return ResponseEntity.ok(notificationService.getUnreadNotificationsByReceiverId(receiverId));
    }

    @PutMapping("/set-notification-as-read/{messageId}")
    ResponseEntity<MessageDto> setNotificationAsRead(@PathVariable UUID messageId) {
        return ResponseEntity.ok(notificationService.setNotificationAsRead(messageId));
    }

    @PutMapping("/set-all-notification-as-read/{receiverId}")
    ResponseEntity<List<MessageDto>> setAllNotificationsAsRead(@PathVariable UUID receiverId) {

        return ResponseEntity.ok(notificationService.setAllNotificationsAsReadByReceiverId(receiverId));
    }

}
