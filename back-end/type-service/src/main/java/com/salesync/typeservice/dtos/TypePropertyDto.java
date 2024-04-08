package com.salesync.typeservice.dtos;


import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.salesync.typeservice.entities.Type;
import lombok.*;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@Builder
@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class TypePropertyDto {
    UUID typeId;

    UUID propertyId;

    String name;

    String label;

    Integer sequence;

    String defaultValue;

    List<TypePropertyFieldDto> fields;


}
