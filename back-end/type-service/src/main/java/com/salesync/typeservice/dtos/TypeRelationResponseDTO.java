package com.salesync.typeservice.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.RequiredArgsConstructor;

@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class TypeRelationResponseDTO {
    @JsonProperty("source_type_relation")
    private TypeRelationDTO sourceTypeRelation;
    @JsonProperty("destination_type_relation")
    private TypeRelationDTO destinationTypeRelation;
}
