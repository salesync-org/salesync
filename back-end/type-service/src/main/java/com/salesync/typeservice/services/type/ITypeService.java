package com.salesync.typeservice.services.type;

import com.salesync.typeservice.dtos.TypeDTO;
import com.salesync.typeservice.dtos.TypeRelationDTO;
import com.salesync.typeservice.entities.Type;

import java.util.List;
import java.util.UUID;

public interface ITypeService {
    TypeDTO createType(TypeDTO typeDTO);

    List<TypeDTO> getAllType();

    TypeDTO getTypeById(String id);

    List<TypeRelationDTO> createLink(TypeRelationDTO typeRelationDTO);

}
