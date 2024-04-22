package com.salesync.notificationservice.components;
import com.salesync.notificationservice.Services.INotificationService;
import com.salesync.notificationservice.dtos.MessageDto;
import com.salesync.notificationservice.dtos.TypeDto;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RabbitMQConsumer {

    private final INotificationService notificationService;
    @RabbitListener(queues = "record-queue",ackMode = "AUTO")
    public void receiveMessage(MessageDto message)
    {
        notificationService.notifyToUser(message.getReceiverId().toString(), message);
    }
}

