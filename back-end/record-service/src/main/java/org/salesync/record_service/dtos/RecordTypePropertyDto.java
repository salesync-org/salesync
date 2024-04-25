package org.salesync.record_service.dtos;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Getter;
import org.salesync.record_service.annotations.validation.is_required.IsRequired;

import java.util.UUID;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Builder
@Getter
public class RecordTypePropertyDto {
    @IsRequired
    private UUID id;
    private String propertyName;
    private String propertyLabel;
    private String itemValue;
}
