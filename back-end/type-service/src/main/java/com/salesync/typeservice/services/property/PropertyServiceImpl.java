package com.salesync.typeservice.services.property;

import com.salesync.typeservice.entities.Property;
import com.salesync.typeservice.repositories.PropertyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class PropertyServiceImpl implements IPropertyService {
    private final PropertyRepository propertyRepository;

    @Override
    public Property getProperty(UUID propertyId) {
        return propertyRepository.findById(propertyId).orElse(null);
    }

    @Override
    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }
}
