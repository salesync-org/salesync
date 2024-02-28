package com.salesync.typeservice.services.type;


import com.salesync.typeservice.dtos.TypeDTO;
import org.springframework.stereotype.Service;

@Service
public class TypeServiceIpl implements ITypeService{
    @Override
    public TypeDTO createType(TypeDTO typeDTO) {
        return typeDTO;
    }
}
