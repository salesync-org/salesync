package org.salesync.record_service.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import org.salesync.record_service.dtos.record_type_relation_dto.RecordTypeRelationDto;
import org.salesync.record_service.dtos.record_type_relation_dto.RelationItemDto;
import org.salesync.record_service.entities.RecordTypeRelation;

import java.util.List;

@Mapper(uses = {RecordMapper.class})
public interface RelationItemMapper {
    RelationItemMapper INSTANCE = Mappers.getMapper(RelationItemMapper.class);

    RelationItemDto recordTypeRelationToRelationItemDto(RecordTypeRelation recordTypeRelation);
    RecordTypeRelation relationItemDtoToRecordTypeRelation(RelationItemDto relationItemDto);

    List<RelationItemDto> recordTypeRelationsToRelationItemDtos(List<RecordTypeRelation> recordTypeRelations);
}
