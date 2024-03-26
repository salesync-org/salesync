package com.salesync.consumer.component;
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