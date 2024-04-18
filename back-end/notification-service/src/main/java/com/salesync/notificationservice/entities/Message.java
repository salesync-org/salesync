package com.salesync.notificationservice.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.UUID;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "message")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "message_id")
    private UUID id;

    @Column(name = "sender_id")
    private UUID senderId;

    @Column(name = "receiver_id")
    private UUID receiverId;

    private String title;

    private String content;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "is_read")
    private Boolean isRead;

    private String url;

    private String action;
}
