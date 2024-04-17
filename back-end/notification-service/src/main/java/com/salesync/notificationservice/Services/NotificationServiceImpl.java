package com.salesync.notificationservice.Services;

import com.salesync.notificationservice.dtos.MessageDto;
import com.salesync.notificationservice.entities.Message;
import com.salesync.notificationservice.mapper.MessageMapper;
import com.salesync.notificationservice.repositories.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class NotificationServiceImpl implements INotificationService {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final MessageRepository messageRepository;
    private final MessageMapper messageMapper=MessageMapper.INSTANCE;


    @Override
    public MessageDto createNotification(MessageDto messageDto) {


        return messageMapper.entityToDto(messageRepository.save(messageMapper.dtoToEntity(messageDto)));
    }

    @Override
    public void notifyToAllUserInClassroom(MessageDto messageDto) {

    }

    @Override
    public void notifyToUser(String user, MessageDto messageDto) {
        simpMessagingTemplate.convertAndSendToUser(user, "/receiver", messageDto);
    }

    @Override
    public List<?> getNotifications() {
        return List.of();
    }

    @Override
    public String setAllNotificationsAsRead() {
        return "";
    }
}
