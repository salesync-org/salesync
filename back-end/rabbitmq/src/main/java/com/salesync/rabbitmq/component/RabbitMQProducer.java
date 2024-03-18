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

    public void sendMessage(MessageDTO message)
    {
        MessageProperties messageProperties= new MessageProperties();
//        messageProperties.setExpiration(String.valueOf(10000));



        Message rabbitMessage = new Message(message.toString().getBytes(), messageProperties);


        rabbitTemplate.convertAndSend(
                "exchange-name", "routing-key", message.toString());



    }
}