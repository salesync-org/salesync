package com.salesync.typeservice.dtos;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@Builder
@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class RequestCreatePropertyDto {
    UUID typeId;

    UUID propertyId;

    String name;

    String label;

    Integer sequence;

    String defaultValue;

    List<RequestTypePropertyFieldDto> fields;

}
