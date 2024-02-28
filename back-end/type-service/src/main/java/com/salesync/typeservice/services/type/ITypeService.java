package com.salesync.typeservice.services;

import com.salesync.typeservice.dtos.TypeDTO;
import com.salesync.typeservice.entities.Type;

public interface ITypeService {
    TypeDTO createType(TypeDTO typeDTO);
}
