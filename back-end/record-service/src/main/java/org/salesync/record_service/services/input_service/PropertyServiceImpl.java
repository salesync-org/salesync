package org.salesync.record_service.services.input_service;

import lombok.RequiredArgsConstructor;
import org.salesync.record_service.dtos.PropertyDTO;
import org.salesync.record_service.entities.Property;
import org.salesync.record_service.mappers.IPropertyMapper;
import org.salesync.record_service.repositories.type_repository.IPropertyRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PropertyServiceImpl implements IPropertyService {
    private final IPropertyRepository propertyRepository;
    private final IPropertyMapper propertyMapper = IPropertyMapper.INSTANCE;

    @Override
    public List<PropertyDTO> loadAllInputTypes(UUID typeId) {
        List<Property> properties = propertyRepository.findAllByTypeId(typeId);
        List<PropertyDTO> propertyDTOs = new ArrayList<>();
        for (Property property : properties) {
            propertyDTOs.add(propertyMapper.propertyToPropertyDTO(property));
        }
        return propertyDTOs;
    }

    @Override
    public PropertyDTO createProperty(PropertyDTO propertyDTO) {
        Property property = propertyRepository.save(propertyMapper.propertyDTOToProperty(propertyDTO));
        return PropertyDTO.builder().
                name(property.getName()).
                label(property.getLabel()).
                defaultValue(property.getDefaultValue()).
                build();
    }
}
