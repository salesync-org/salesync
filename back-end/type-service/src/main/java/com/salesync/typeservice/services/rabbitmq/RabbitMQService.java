package com.salesync.typeservice.services.rabbitmq;

import com.salesync.typeservice.dtos.RabbitMQMessageDto;

public interface RabbitMQService {
    void dispatchMessage(RabbitMQMessageDto message);

}
