package com.salesync.typeservice.services.type;

import com.salesync.typeservice.dtos.TypeDTO;
import com.salesync.typeservice.dtos.TypeRelationDTO;
import com.salesync.typeservice.dtos.TypeRelationResponseDTO;

import java.util.List;

public interface TypeService {
    TypeDTO createType(TypeDTO typeDTO);

    TypeDTO getType(String typeId);

    List<TypeDTO> getAllType();

    List<TypeRelationDTO> getAllTypeLinks(String id);

    TypeRelationResponseDTO createLink(TypeRelationDTO typeRelationDTO);

    TypeRelationResponseDTO updateTypeRelation(TypeRelationDTO typeRelationDTO);
}
