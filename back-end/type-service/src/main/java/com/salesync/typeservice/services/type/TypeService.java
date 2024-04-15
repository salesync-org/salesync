package com.salesync.typeservice.services.type;

import com.salesync.typeservice.dtos.*;
import com.salesync.typeservice.entities.Type;
import com.salesync.typeservice.entities.TypeProperty;

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

    TypeProperty createProperty(RequestCreatePropertyDto requestCreatePropertyDto);

    RelationTypeResponseDto createRelationType(RelationTypeRequestDto relationTypeRequestDto);
}
