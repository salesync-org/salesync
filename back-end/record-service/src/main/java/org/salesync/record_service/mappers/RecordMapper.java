package org.salesync.record_service.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import org.salesync.record_service.dtos.RecordDto;
import org.salesync.record_service.entities.Record;

@Mapper(uses = {RecordTypePropertyMapper.class})
public interface RecordMapper {
    RecordMapper INSTANCE = Mappers.getMapper(RecordMapper.class);

    @Mapping(source = "record.recordStage.stageId", target = "currentStageId")
    RecordDto recordToRecordDto(Record record);

    Record recordDtoToRecord(RecordDto recordDto);
}
