package com.salesync.typeservice.dtos;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Getter
public class TypeRelationDTO {
    UUID id;

    @JsonProperty("source_type")
    TypeDTO sourceType;
    @JsonProperty("source_type_label")
    String sourceTypeLabel;
    @JsonProperty("relation")
    RelationDTO relation;
    @JsonProperty("destination_type")
    TypeDTO destinationType;
    @JsonProperty("destination_label")
    String destinationTypeLabel;
}
