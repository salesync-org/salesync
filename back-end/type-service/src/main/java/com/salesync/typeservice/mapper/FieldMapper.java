package com.salesync.typeservice.mapper;

import com.salesync.typeservice.constants.Route;
import com.salesync.typeservice.dtos.FieldDto;
import com.salesync.typeservice.entities.Field;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface FieldMapper {
    FieldMapper INSTANCE = Mappers.getMapper(FieldMapper.class);

    FieldDto fieldToFieldDto(Field field);

    Field fieldDtoToField(FieldDto fieldDto);
}
