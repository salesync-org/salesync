package com.salesync.typeservice.mapper;

import com.salesync.typeservice.dtos.PropertyDto;
import com.salesync.typeservice.entities.Property;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(uses = {PropertyFieldMapper.class})
public interface PropertyMapper {
    PropertyMapper INSTANCE = Mappers.getMapper(PropertyMapper.class);

    Property dtoToEntity(PropertyDto dto);

    PropertyDto entityToDto(Property entity);

}