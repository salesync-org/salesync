package org.salesync.record_service.services.rabbitmq;

import org.salesync.record_service.dtos.RabbitMQMessageDto;

public interface RabbitMQService {
    void dispatchMessage(RabbitMQMessageDto message);

}
