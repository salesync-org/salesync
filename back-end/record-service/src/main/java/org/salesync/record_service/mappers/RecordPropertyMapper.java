package org.salesync.record_service.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import org.salesync.record_service.dtos.RecordPropertyDto;
import org.salesync.record_service.entities.RecordProperty;

@Mapper
public interface RecordPropertyMapper {
    RecordPropertyMapper INSTANCE = Mappers.getMapper(RecordPropertyMapper.class);

    RecordProperty recordPropertyDtoToRecordProperty(RecordPropertyDto recordPropertyDto);

    RecordPropertyDto recordPropertyToRecordPropertyDto(RecordProperty recordProperty);
}
