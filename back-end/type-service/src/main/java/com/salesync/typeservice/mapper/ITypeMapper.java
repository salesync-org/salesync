package com.salesync.typeservice.mapper;


import com.salesync.typeservice.dtos.TypeDTO;
import com.salesync.typeservice.dtos.TypeRelationDTO;
import com.salesync.typeservice.entities.Type;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.Optional;

@Mapper
public interface ITypeMapper {
    ITypeMapper INSTANCE = Mappers.getMapper(ITypeMapper.class);

    TypeDTO typeToTypeDTO(Type type);

    Type typeDTOToType(TypeDTO typeDTO);
}
