package org.salesync.record_service.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Builder
@Getter
@Setter
public class RecordDto {
    private UUID id;
    private String name;
    private UUID userId;
    TypeDto type;
    @JsonProperty("properties")
    private List<RecordTypePropertyDto> recordProperties;
}
