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
public class RelationDTO {
    UUID id;
    String name;
    @JsonProperty("inverse_id")
    UUID inverseId;
}
