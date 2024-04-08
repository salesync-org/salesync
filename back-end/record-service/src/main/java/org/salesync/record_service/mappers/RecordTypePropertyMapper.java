package org.salesync.record_service.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import org.salesync.record_service.dtos.RecordTypePropertyDto;
import org.salesync.record_service.entities.RecordTypeProperty;

@Mapper
public interface RecordTypePropertyMapper {
    RecordTypePropertyMapper INSTANCE = Mappers.getMapper(RecordTypePropertyMapper.class);

    RecordTypeProperty dtoToEntity(RecordTypePropertyDto recordTypePropertyDto);
    RecordTypePropertyDto entityToDto(RecordTypeProperty recordTypeProperty);
}
