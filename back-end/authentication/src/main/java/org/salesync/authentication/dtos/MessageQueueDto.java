package org.salesync.authentication.dtos;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;

import org.salesync.authentication.enums.ActionType;

@Builder
@Getter
@Setter
public class MessageQueueDto implements Serializable {
    @Serial
    private static final long serialVersionUID = -8443591765231358078L;
    private ActionType actionType;
    private Object payload;
}
