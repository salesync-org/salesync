package com.salesync.notificationservice.repositories;

import com.salesync.notificationservice.entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface MessageRepository extends JpaRepository<Message, UUID> {

    List<Message> findAllByReceiverId(UUID receiverId);
    List<Message> findAllByReceiverIdAndIsReadEquals(UUID receiverId, Boolean isRead);
}
