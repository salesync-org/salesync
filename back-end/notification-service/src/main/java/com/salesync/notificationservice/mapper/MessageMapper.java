package com.salesync.notificationservice.mapper;


import com.salesync.notificationservice.dtos.MessageDto;
import com.salesync.notificationservice.entities.Message;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface MessageMapper {
    MessageMapper INSTANCE = Mappers.getMapper(MessageMapper.class);

    MessageDto entityToDto(Message message);

    Message dtoToEntity(MessageDto messageDto);
}
