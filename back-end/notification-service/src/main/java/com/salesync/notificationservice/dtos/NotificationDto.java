package com.salesync.notificationservice.dtos;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Builder
@Data
public class NotificationDto {
    String id;
    String title;
    String content;
    @JsonProperty("is_read")
    Boolean isRead;
    @JsonProperty("sender_id")
    String senderId;
    @JsonProperty("created_at")
    Date createdAt;
    @JsonProperty("receiver_id")
    String receiverId;
}
