package com.salesync.notificationservice.controllers;


import com.salesync.notificationservice.Services.INotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.util.HtmlUtils;

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


}
