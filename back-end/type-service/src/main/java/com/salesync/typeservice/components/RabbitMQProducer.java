package com.salesync.typeservice.components;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.core.Exchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RabbitMQProducer {

    private final RabbitTemplate rabbitTemplate;
    private final Exchange exchange;

    //routing key theo các key đã map trong file RabbitMQConfig
    public void sendMessage(String routingKey, Object message)
    {
        rabbitTemplate.convertAndSend(
                exchange.getName(), routingKey, message);

    }

}