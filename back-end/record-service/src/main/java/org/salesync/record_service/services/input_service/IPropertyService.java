package org.salesync.record_service.services.input_service;

import org.salesync.record_service.dtos.PropertyDTO;

import java.util.List;
import java.util.UUID;

public interface IPropertyService {
    public List<PropertyDTO> loadAllInputTypes(UUID typeId);

    PropertyDTO createProperty(PropertyDTO propertyDTO);
}
