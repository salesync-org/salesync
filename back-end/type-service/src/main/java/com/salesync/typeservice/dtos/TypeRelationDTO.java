package com.salesync.typeservice.dtos;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Getter
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class TypeRelationDTO {
    UUID id;

    TypeDTO sourceType;

    String sourceTypeLabel;

    RelationDTO relation;

    TypeDTO destinationType;

    String destinationTypeLabel;
}
