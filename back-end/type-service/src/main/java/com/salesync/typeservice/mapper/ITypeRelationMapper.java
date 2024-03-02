package com.salesync.typeservice.mapper;


import com.salesync.typeservice.dtos.TypeRelationDTO;
import com.salesync.typeservice.entities.TypeRelation;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(uses = {ITypeMapper.class, IRelationMapper.class})
public interface ITypeRelationMapper {
    ITypeRelationMapper INSTANCE = Mappers.getMapper(ITypeRelationMapper.class);

    TypeRelationDTO typeRelationToTypeRelationDTO(TypeRelation typeRelation);

    TypeRelation typeRelationDTOToTypeRelation(TypeRelationDTO typeRelationDTO);
}
