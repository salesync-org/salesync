package com.salesync.notificationservice.controllers;


import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.util.HtmlUtils;

import java.security.Principal;

@Controller
@EnableWebSocketMessageBroker
public class NotificationController {

    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public String greeting(String message) throws Exception {
        Thread.sleep(5000); // simulated delay
        System.out.println("Message: " + message);
        return "Hello, " + HtmlUtils.htmlEscape("hiii") + "!";
    }


}
