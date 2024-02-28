package com.salesync.typeservice.mapper;


import com.salesync.typeservice.dtos.TypeDTO;
import com.salesync.typeservice.entities.Type;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.Optional;

@Mapper(componentModel = "spring")
public interface ITypeMapper {
    ITypeMapper INSTANCE = Mappers.getMapper(ITypeMapper.class);


    @Mapping(source = "id",target = "id")
    @Mapping(source = "name",target = "name")
    TypeDTO typeToTypeDTO(Type type);


    @Mapping(source = "id",target = "id")
    @Mapping(source = "name",target = "name")
    Type typeDTOToType(TypeDTO typeDTO);

}
