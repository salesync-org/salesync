package com.salesync.typeservice.dtos;

import com.salesync.typeservice.enums.ActionType;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;

@Builder
@Getter
@Setter
public class RabbitMQMessageDto implements Serializable {
    @Serial
    private static final long serialVersionUID = -8443591765231358078L;
    private ActionType actionType;
    private Object payload;
}
