package com.salesync.typeservice.mapper;


import com.salesync.typeservice.dtos.TypeRelationDTO;
import com.salesync.typeservice.entities.TypeRelation;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(uses = {TypeMapper.class, RelationMapper.class})
public interface TypeRelationMapper {
    TypeRelationMapper INSTANCE = Mappers.getMapper(TypeRelationMapper.class);

    TypeRelationDTO typeRelationToTypeRelationDTO(TypeRelation typeRelation);

    TypeRelation typeRelationDTOToTypeRelation(TypeRelationDTO typeRelationDTO);
}
