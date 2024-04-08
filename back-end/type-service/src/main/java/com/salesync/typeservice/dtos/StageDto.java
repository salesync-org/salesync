package com.salesync.typeservice.dtos;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.salesync.typeservice.annotations.validation.contain_id.ContainId;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Builder
@Setter
@Getter
public class StageDto {
    private UUID id;
    private String name;
    private Integer sequenceNumber;
    @ContainId
    private TypeDTO type;
}
