package com.salesync.rabbitmq.component;
import com.salesync.rabbitmq.dto.MessageDTO;
import lombok.AllArgsConstructor;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageProperties;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class RabbitMQProducer {

    private RabbitTemplate rabbitTemplate;

    //routing key theo các key đã map trong file RabbitMQConfig
    public void sendMessage(String routingKey,String message)
    {
        rabbitTemplate.convertAndSend(
                "topic-exchange", routingKey, message);

    }
}