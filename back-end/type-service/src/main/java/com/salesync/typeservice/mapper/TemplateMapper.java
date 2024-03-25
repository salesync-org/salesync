package com.salesync.typeservice.mapper;

import com.salesync.typeservice.dtos.TemplateDto;
import com.salesync.typeservice.entities.Template;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface TemplateMapper {
    TemplateMapper INSTANCE = Mappers.getMapper(TemplateMapper.class);

    Template dtoToEntity(TemplateDto dto);

    TemplateDto entityToDto(Template entity);

}