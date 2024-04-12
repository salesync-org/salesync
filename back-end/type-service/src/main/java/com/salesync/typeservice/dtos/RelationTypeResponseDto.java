package com.salesync.typeservice.dtos;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Getter;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Builder
@Getter
public class RelationTypeResponseDto {
    TypeDTO sourceType;

    String sourceTypeLabel;

    RelationDTO relation;

    RelationDTO inverseRelation;

    TypeDTO destinationType;

    String destinationTypeLabel;
}
