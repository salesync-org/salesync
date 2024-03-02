package com.salesync.typeservice.services.type;

import com.salesync.typeservice.dtos.TypeDTO;
import com.salesync.typeservice.dtos.TypeRelationDTO;
import com.salesync.typeservice.dtos.TypeRelationResponseDTO;

import java.util.List;

public interface ITypeService {
    TypeDTO createType(TypeDTO typeDTO);

    List<TypeDTO> getAllType();

    TypeDTO getTypeById(String id);

    TypeRelationResponseDTO createLink(TypeRelationDTO typeRelationDTO);

    TypeRelationResponseDTO updateTypeRelation(TypeRelationDTO typeRelationDTO);
}
