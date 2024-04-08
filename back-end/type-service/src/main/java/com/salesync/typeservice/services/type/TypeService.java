package com.salesync.typeservice.services.type;

import com.salesync.typeservice.dtos.TypeDTO;
import com.salesync.typeservice.dtos.TypeRelationDTO;
import com.salesync.typeservice.dtos.TypeRelationResponseDTO;
import com.salesync.typeservice.entities.Type;

import java.util.List;
import java.util.UUID;

public interface TypeService {
    TypeDTO createType(TypeDTO typeDTO);

    TypeDTO getType(UUID typeId);

    List<TypeDTO> getAllType();

    List<TypeRelationDTO> getAllRelationsByType(UUID typeId);

    TypeRelationResponseDTO makeRelation(TypeRelationDTO typeRelationDTO);

    TypeRelationResponseDTO updateLabelOfTypeRelation(TypeRelationDTO typeRelationDTO);

    Type getTypeDetailsById(UUID typeId);
}
