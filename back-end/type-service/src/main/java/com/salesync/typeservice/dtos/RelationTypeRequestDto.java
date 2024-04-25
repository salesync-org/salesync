package com.salesync.typeservice.dtos;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Builder
@Getter
public class RelationTypeRequestDto {
    UUID relationId;
    UUID sourceTypeId;
    UUID destinationTypeId;
    String sourceTypeLabel;
    String destinationTypeLabel;
}
