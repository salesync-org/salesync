package com.salesync.typeservice.mapper;

import com.salesync.typeservice.dtos.RelationDTO;
import com.salesync.typeservice.dtos.TypeDTO;
import com.salesync.typeservice.entities.Relation;
import com.salesync.typeservice.entities.Type;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface IRelationMapper {

    IRelationMapper INSTANCE = Mappers.getMapper(IRelationMapper.class);

    RelationDTO relationToRelationDTO(Relation relation);

    Relation relationDTOToRelation(RelationDTO relationDTO);
}
