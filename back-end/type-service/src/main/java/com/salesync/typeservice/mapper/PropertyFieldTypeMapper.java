package com.salesync.typeservice.mapper;

import com.salesync.typeservice.dtos.PropertyFieldTypeDto;
import com.salesync.typeservice.entities.PropertyFieldType;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(uses = {FieldMapper.class})
public interface PropertyFieldTypeMapper {
    PropertyFieldTypeMapper INSTANCE = Mappers.getMapper(PropertyFieldTypeMapper.class);

    PropertyFieldType dtoToEntity(PropertyFieldTypeDto dto);

    PropertyFieldTypeDto entityToDto(PropertyFieldType entity);

}