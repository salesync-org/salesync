package org.salesync.record_service.dtos;


import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Builder
@Getter
@Setter
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class RecordTypeRelationDto {
    UUID id;
    RecordDto sourceRecord;
    RecordDto destinationRecord;
    UUID typeRelationId;
}
