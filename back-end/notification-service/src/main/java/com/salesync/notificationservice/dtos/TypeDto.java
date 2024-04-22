package com.salesync.notificationservice.dtos;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.io.Serializable;
import java.util.UUID;

@AllArgsConstructor
@RequiredArgsConstructor
@Data
@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class TypeDto implements Serializable {

    private static final long serialVersionUID = -2408414599486046563L;

    private UUID id;
    private String name;
    private TemplateDto template;
}
