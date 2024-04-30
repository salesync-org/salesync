package com.salesync.typeservice.mapper;

import com.salesync.typeservice.dtos.TypePropertyDto;
import com.salesync.typeservice.entities.TypeProperty;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(uses = {TypePropertyFieldMapper.class, TypeMapper.class, PropertyMapper.class}, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TypePropertyMapper {

    TypePropertyMapper INSTANCE = Mappers.getMapper(TypePropertyMapper.class);

    @Mapping(target = "fields", source = "typePropertyFields")
    TypePropertyDto entityToDto(TypeProperty entity);

    @Mapping(target = "typePropertyFields", source = "fields")

    TypeProperty dtoToEntity(TypePropertyDto dto);

}
