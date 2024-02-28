package com.salesync.typeservice.services.type;

import com.salesync.typeservice.dtos.TypeDTO;
import com.salesync.typeservice.entities.Type;

import java.util.List;

public interface ITypeService {
    TypeDTO createType(TypeDTO typeDTO);

    List<TypeDTO> getAllType();

}
