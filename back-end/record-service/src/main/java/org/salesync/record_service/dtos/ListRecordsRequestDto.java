package org.salesync.record_service.dtos;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Getter;
import org.salesync.record_service.annotations.validation.IsRequired;

import java.util.List;
import java.util.UUID;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Builder
@Getter
public class ListRecordsRequestDto {
    private String searchTerm;
    @IsRequired
    private UUID typeId;
    private String propertyName;
    private Boolean isAsc;
    private Integer pageSize;
    private Integer currentPage;
}
