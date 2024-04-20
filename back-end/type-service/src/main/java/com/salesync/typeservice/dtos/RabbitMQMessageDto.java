package com.salesync.typeservice.dtos;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonTypeName;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.salesync.typeservice.enums.ActionType;
import lombok.*;

import java.io.Serializable;


@Builder
@Getter
@Setter
public class RabbitMQMessageDto implements Serializable {
    private static final long serialVersionUID = -8443591765231358078L;
    private ActionType actionType;
    private Object payload;
}
