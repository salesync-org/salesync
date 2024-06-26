package org.salesync.record_service.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.UUID;

@Builder
@Data
public class MessageDto implements Serializable {

    private static final long serialVersionUID = -2408414599486046563L;

    UUID id;

    @JsonProperty("sender_id")
    UUID senderId;

    @JsonProperty("receiver_id")
    UUID receiverId;

    String title;

    String content;

    @JsonProperty("created_at")
    Date createdAt;

    @JsonProperty("is_read")
    Boolean isRead;

    private String url;

    private String action;
}
