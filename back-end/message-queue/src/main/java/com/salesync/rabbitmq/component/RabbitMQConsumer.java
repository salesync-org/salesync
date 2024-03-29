package com.salesync.rabbitmq.component;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class RabbitMQConsumer {

    @RabbitListener(queues = "record-queue",ackMode = "AUTO")
    public void receiveMessage(String message)
    {
        // Handle the received message here
        System.out.println(message);
    }
}

