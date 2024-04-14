package com.salesync.notificationservice.controllers;

import com.salesync.notificationservice.Services.INotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class TestController {

    private final INotificationService notificationService;

    @GetMapping("/test")
    String test() {
        notificationService.notifyToUser("abc", null);
        return "ok";
    }
}
