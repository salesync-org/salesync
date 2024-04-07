package com.salesync.typeservice.mapper;

import com.salesync.typeservice.dtos.StageDto;
import com.salesync.typeservice.entities.Stage;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(uses = {TypeMapper.class})
public interface StageMapper {
    StageMapper INSTANCE = Mappers.getMapper(StageMapper.class);

    Stage dtoToEntity(StageDto dto);

    StageDto entityToDto(Stage entity);

}