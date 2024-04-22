package com.salesync.typeservice.dtos;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.salesync.typeservice.annotations.validation.is_reuqired.IsRequired;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Builder
@Getter
@Setter
public class StageUpdateSeqNumberRequestDto {
    @IsRequired
    private UUID stageId;
    @IsRequired
    private Integer sequenceNumber;
}
