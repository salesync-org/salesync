package org.salesync.record_service.dtos.record_type_relation_dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.salesync.record_service.dtos.RecordDto;

import java.util.List;

@Getter
@Setter
@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class ListRecordTypeRelationsDto {
    RecordDto sourceRecord;
    List<RelationItemDto> relations;
}
