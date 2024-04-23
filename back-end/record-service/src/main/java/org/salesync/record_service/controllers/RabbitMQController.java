package org.salesync.record_service.controllers;

import lombok.RequiredArgsConstructor;
import org.salesync.record_service.dtos.RabbitMQMessageDto;
import org.salesync.record_service.services.rabbitmq.RabbitMQService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class RabbitMQController {
    private final RabbitMQService rabbitMQService;

    @RabbitListener(queues = "type-queue", ackMode = "AUTO")
    public void receiveMessage(RabbitMQMessageDto message) {
        rabbitMQService.dispatchMessage(message);
    }
}
