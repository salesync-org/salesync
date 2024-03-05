package com.salesync.typeservice.services.type;

import com.salesync.typeservice.dtos.TypeDTO;
import com.salesync.typeservice.dtos.TypeRelationDTO;
import com.salesync.typeservice.dtos.TypeRelationResponseDTO;

import java.util.List;
import java.util.UUID;

public interface ITypeService {
    TypeDTO createType(TypeDTO typeDTO);

    List<TypeDTO> getAllType();

    List<TypeRelationDTO> getAllTypeLinks(UUID id);

    TypeRelationResponseDTO createLink(TypeRelationDTO typeRelationDTO);

    TypeRelationResponseDTO updateTypeRelation(TypeRelationDTO typeRelationDTO);
}
