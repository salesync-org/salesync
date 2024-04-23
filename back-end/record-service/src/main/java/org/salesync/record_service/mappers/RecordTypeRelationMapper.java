package org.salesync.record_service.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import org.salesync.record_service.dtos.record_type_relation_dto.RecordTypeRelationDto;
import org.salesync.record_service.entities.RecordTypeRelation;

@Mapper(uses = {RecordMapper.class})
public interface RecordTypeRelationMapper {
    RecordTypeRelationMapper INSTANCE = Mappers.getMapper(RecordTypeRelationMapper.class);

    RecordTypeRelationDto recordTypeRelationToRecordTypeRelationDto(RecordTypeRelation recordTypeRelation);

    RecordTypeRelation recordTypeRelationDtoToRecordTypeRelation(RecordTypeRelationDto recordTypeRelationDto);
}
