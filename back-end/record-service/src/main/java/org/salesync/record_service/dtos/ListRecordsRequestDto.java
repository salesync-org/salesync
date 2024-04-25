package org.salesync.record_service.dtos;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Data;
import org.salesync.record_service.annotations.validation.is_required.IsRequired;

import java.util.UUID;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Builder
@Data
public class ListRecordsRequestDto {
    private String searchTerm;
    @IsRequired
    private UUID typeId;
    private String propertyName;
    private boolean isAsc;
    private Integer pageSize;
    private Integer currentPage = 1;

    public Integer getPageSize() {
        return pageSize == null ? 5 : pageSize;
    }

    public Integer getCurrentPage() {
        return currentPage == null ? 1 : currentPage;
    }
}
