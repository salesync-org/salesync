package com.salesync.typeservice.mapper;


import com.salesync.typeservice.dtos.TypePropertyDto;
import com.salesync.typeservice.entities.TypeProperty;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(uses = {TypePropertyFieldMapper.class, TypeMapper.class, PropertyMapper.class})

public interface TypePropertyMapper {

    TypePropertyMapper INSTANCE = Mappers.getMapper(TypePropertyMapper.class);
    @Mapping(target = "typeId", source = "type.id")
    @Mapping(target = "propertyId", source = "property.id")
    @Mapping(target = "fields", source = "typePropertyFields")
    TypePropertyDto entityToDto(TypeProperty entity);


    @Mapping(target = "type.id", source = "typeId")
    @Mapping(target = "property.id", source = "propertyId")
    @Mapping(target = "typePropertyFields", source = "fields")
    TypeProperty dtoToEntity(TypePropertyDto dto);

}
