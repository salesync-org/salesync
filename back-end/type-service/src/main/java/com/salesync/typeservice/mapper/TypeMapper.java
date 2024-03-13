package com.salesync.typeservice.mapper;


import com.salesync.typeservice.dtos.TypeDTO;
import com.salesync.typeservice.entities.Type;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface TypeMapper {
    TypeMapper INSTANCE = Mappers.getMapper(TypeMapper.class);

    TypeDTO typeToTypeDTO(Type type);

    Type typeDTOToType(TypeDTO typeDTO);
}
