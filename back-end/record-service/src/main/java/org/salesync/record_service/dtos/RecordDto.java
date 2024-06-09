package org.salesync.record_service.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.salesync.record_service.annotations.validation.contain_id.ContainId;
import org.salesync.record_service.annotations.validation.is_required.IsRequired;

import java.util.List;
import java.util.UUID;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Builder
@Getter
@Setter
public class RecordDto {
    private UUID id;
    @IsRequired
    private String name;
    private UUID userId;
    @ContainId
    private TypeDto type;
    private UUID currentStageId;
    @JsonProperty("properties")
    private List<RecordTypePropertyDto> recordProperties;
}
