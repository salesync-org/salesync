package org.salesync.record_service.dtos;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.UUID;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Builder
@Getter
public class CreateRecordRequestDto {
    private String recordName;
    private UUID stageId;
    List<RecordTypePropertyDto> properties;
}
