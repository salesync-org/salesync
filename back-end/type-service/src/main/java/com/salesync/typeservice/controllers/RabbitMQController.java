package com.salesync.typeservice.controllers;

import lombok.RequiredArgsConstructor;
import com.salesync.typeservice.dtos.RabbitMQMessageDto;
import com.salesync.typeservice.services.rabbitmq.RabbitMQService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class RabbitMQController {
    private final RabbitMQService rabbitMQService;

    @RabbitListener(queues = "auth-queue", ackMode = "AUTO")
    public void receiveMessage(RabbitMQMessageDto message) {
        rabbitMQService.dispatchMessage(message);
    }
}
