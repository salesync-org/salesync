package com.salesync.typeservice.mapper;

import com.salesync.typeservice.dtos.TypePropertyFieldDto;
import com.salesync.typeservice.entities.TypePropertyField;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface TypePropertyFieldMapper {
    TypePropertyFieldMapper INSTANCE = Mappers.getMapper(TypePropertyFieldMapper.class);

    TypePropertyField dtoToEntity(TypePropertyFieldDto dto);

    TypePropertyFieldDto entityToDto(TypePropertyField entity);

}