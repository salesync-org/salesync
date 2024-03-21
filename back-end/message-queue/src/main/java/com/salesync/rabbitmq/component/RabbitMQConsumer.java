package com.salesync.rabbitmq.component;
import com.salesync.rabbitmq.dto.MessageDTO;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class RabbitMQConsumer {

    @RabbitListener(queues = "queue-name",ackMode = "NONE")
    public void receiveMessage(String message)
    {
        // Handle the received message here
        System.out.println(message);
    }
}