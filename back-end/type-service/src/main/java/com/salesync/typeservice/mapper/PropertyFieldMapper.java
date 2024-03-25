package com.salesync.typeservice.mapper;

import com.salesync.typeservice.dtos.PropertyFieldDto;
import com.salesync.typeservice.entities.PropertyField;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(uses = {TypePropertyFieldMapper.class})
public interface PropertyFieldMapper {
    PropertyFieldMapper INSTANCE = Mappers.getMapper(PropertyFieldMapper.class);

    PropertyField dtoToEntity(PropertyFieldDto dto);

    PropertyFieldDto entityToDto(PropertyField entity);

}