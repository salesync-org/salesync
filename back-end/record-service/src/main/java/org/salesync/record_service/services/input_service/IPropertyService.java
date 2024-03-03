package org.salesync.record_service.services.input_service;

import org.salesync.record_service.dtos.PropertyDTO;

import java.util.List;

public interface IPropertyService {
    public List loadAllInputTypes();

    PropertyDTO createProperty(String typeId);
}
