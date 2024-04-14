package com.salesync.notificationservice.Components;
import com.salesync.notificationservice.Services.INotificationService;
import com.salesync.notificationservice.dtos.NotificationDto;
import com.salesync.notificationservice.dtos.TypeDto;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RabbitMQConsumer {

    private final INotificationService notificationService;



    @RabbitListener(queues = "record-queue",ackMode = "AUTO")
    public void receiveMessage(TypeDto message)
    {
        notificationService.notifyToUser("abc", NotificationDto.builder().content(message.getName()).build());
    }
}

