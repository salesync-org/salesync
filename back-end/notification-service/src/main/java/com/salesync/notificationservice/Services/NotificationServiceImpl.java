package com.salesync.notificationservice.Services;

import com.salesync.notificationservice.dtos.MessageDto;
import com.salesync.notificationservice.entities.Message;
import com.salesync.notificationservice.mapper.MessageMapper;
import com.salesync.notificationservice.repositories.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.Comparator;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class NotificationServiceImpl implements INotificationService {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final MessageRepository messageRepository;
    private final MessageMapper messageMapper=MessageMapper.INSTANCE;


    @Override
    public MessageDto createNotification(MessageDto messageDto) {
        Message message = messageMapper.dtoToEntity(messageDto);
        Message message1=messageRepository.save(message);
        return messageMapper.entityToDto(message1);
    }

    @Override
    public void notifyToAllUserInClassroom(MessageDto messageDto) {

    }

    @Override
    public void notifyToUser(String user, MessageDto messageDto) {
        simpMessagingTemplate.convertAndSendToUser(user, "/receiver", createNotification(messageDto));

    }

    @Override
    public List<MessageDto> getUnreadNotificationsByReceiverId(UUID receiverId) {
        return messageRepository.findAllByReceiverIdAndIsReadEquals(receiverId,false).stream().map(messageMapper::entityToDto)
            .sorted(Comparator.reverseOrder())
            .collect(Collectors.toList());
    }

    @Override
    public MessageDto setNotificationAsRead(UUID messageId) {
        Message message = messageRepository.findById(messageId).orElse(null);

        if (message != null) {
            message.setIsRead(true);
            return messageMapper.entityToDto(messageRepository.save(message));
        }
        return null;
    }
@Override
public List<MessageDto> getNotificationsByReceiverId(UUID receiverId) {
    return messageRepository.findAllByReceiverId(receiverId).stream()
            .map(messageMapper::entityToDto)
            .sorted(Comparator.reverseOrder())
            .collect(Collectors.toList());
}

    @Override
    public List<MessageDto> setAllNotificationsAsReadByReceiverId(UUID receiverId) {
        List<Message> messages = messageRepository.findAllByReceiverIdAndIsReadEquals(receiverId, false);
        messages.forEach(message -> message.setIsRead(true));
        return messages.stream().map(message -> messageMapper.entityToDto(messageRepository.save(message))).toList();
    }


}
