package com.salesync.typeservice.services.type;


import com.salesync.typeservice.dtos.TypeDTO;
import com.salesync.typeservice.entities.Type;
import com.salesync.typeservice.mapper.ITypeMapper;
import com.salesync.typeservice.repositories.ITypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TypeServiceIpl implements ITypeService{
    private final ITypeRepository typeRepository;
    private final ITypeMapper typeMapper = ITypeMapper.INSTANCE;

    @Override
    public TypeDTO createType(TypeDTO typeDTO) {
        Type savedType=typeRepository.save(typeMapper.typeDTOToType(typeDTO));
        return  typeMapper.typeToTypeDTO(savedType);

    }

    @Override
    public List<TypeDTO> getAllType() {
        return typeRepository.findAll().stream().map(
                type -> typeMapper.typeToTypeDTO(type)
        ).collect(Collectors.toList());
    }


}
