package org.salesync.record_service.dtos;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.salesync.record_service.constants.enums.ActionType;

import java.io.Serializable;

@Builder
@Getter
@Setter
public class RabbitMQMessageDto implements Serializable {
    private static final long serialVersionUID = -8443591765231358078L;
    private ActionType actionType;
    private Object payload;
}
