package org.salesync.record_service.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import org.salesync.record_service.dtos.RecordDto;
import org.salesync.record_service.entities.Record;

@Mapper
public interface RecordMapper {
    RecordMapper INSTANCE = Mappers.getMapper(RecordMapper.class);
    RecordDto recordToRecordDto(Record record);
    Record recordDtoToRecord(RecordDto recordDto);
}
