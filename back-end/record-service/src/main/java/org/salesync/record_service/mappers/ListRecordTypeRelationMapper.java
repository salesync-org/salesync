package org.salesync.record_service.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import org.salesync.record_service.dtos.record_type_relation_dto.ListRecordTypeRelationsDto;
import org.salesync.record_service.dtos.record_type_relation_dto.RecordTypeRelationDto;
import org.salesync.record_service.dtos.record_type_relation_dto.RelationItemDto;
import org.salesync.record_service.entities.RecordTypeRelation;

import java.util.List;

@Mapper(uses = {RelationItemMapper.class, RecordMapper.class})
public interface ListRecordTypeRelationMapper {
//    ListRecordTypeRelationMapper INSTANCE = Mappers.getMapper(ListRecordTypeRelationMapper.class);
//
//    ListRecordTypeRelationsDto recordTypeRelationToListRecordTypeRelationsDto(RecordTypeRelation recordTypeRelation);
//    RecordTypeRelation listRecordTypeRelationsDtoToRecordTypeRelation(ListRecordTypeRelationsDto listRecordTypeRelationsDtoistRecordTypeRelationsDto);

}
