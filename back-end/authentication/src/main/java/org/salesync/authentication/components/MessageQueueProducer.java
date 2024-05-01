package org.salesync.authentication.components;

import lombok.AllArgsConstructor;
import org.salesync.authentication.dtos.MessageQueueDto;
import org.springframework.amqp.core.Exchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class MessageQueueProducer {

    private final Exchange exchange;
    private RabbitTemplate rabbitTemplate;

    public void sendMessage(String routingKey, MessageQueueDto message) {
        rabbitTemplate.convertAndSend(
                exchange.getName(), routingKey, message);
    }
}