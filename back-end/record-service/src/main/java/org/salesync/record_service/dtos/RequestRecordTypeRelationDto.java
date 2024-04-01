package org.salesync.record_service.dtos;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Builder
@Getter
@Setter
@Data
public class RequestRecordTypeRelationDto {
    private UUID sourceRecordId;
    private UUID destinationRecordId;
    private UUID typeRelationId;
}
