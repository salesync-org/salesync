package org.salesync.record_service.components;

import lombok.AllArgsConstructor;
import org.salesync.record_service.dtos.TypeDto;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class RabbitMQProducer {

    private RabbitTemplate rabbitTemplate;

    //routing key theo các key đã map trong file RabbitMQConfig
    public void sendMessage(String routingKey,String message)
    {
        rabbitTemplate.convertAndSend(
                "topic-exchange", routingKey, TypeDto.builder().name(message).build());

    }
}