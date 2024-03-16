package com.salesync.typeservice.dtos;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.UUID;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Builder
@Getter
public class PropertyFieldDto {
    private UUID id;
    private String label;
    private String name;
    private Boolean isRequired;
    private Boolean isKey;
    private List<PropertyFieldTypeDto> fields;
    private String value;
}
