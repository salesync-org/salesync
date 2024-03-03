package org.salesync.record_service.services.input_service;

import lombok.RequiredArgsConstructor;
import org.salesync.record_service.dtos.PropertyDTO;
import org.salesync.record_service.repositories.type_repository.IPropertyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PropertyServiceImpl implements IPropertyService {
    private final IPropertyRepository propertyRepository;

    @Override
    public List loadAllInputTypes() {
        return propertyRepository.findAll();
    }

    @Override
    public PropertyDTO createProperty(PropertyDTO propertyDTO) {
        PropertyDTO property = propertyRepository.findByTypeId(propertyDTO.getTypeId());
        return PropertyDTO.builder().
                name(propertyDTO.getName()).
                label(propertyDTO.getLabel()).
                defaultValue(propertyDTO.getDefaultValue()).
                build();
    }
}
