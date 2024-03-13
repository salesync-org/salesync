package com.salesync.typeservice.mapper;

import com.salesync.typeservice.dtos.RelationDTO;
import com.salesync.typeservice.entities.Relation;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface RelationMapper {

    RelationMapper INSTANCE = Mappers.getMapper(RelationMapper.class);

    RelationDTO relationToRelationDTO(Relation relation);

    Relation relationDTOToRelation(RelationDTO relationDTO);
}
