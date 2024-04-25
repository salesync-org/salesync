package com.salesync.typeservice.services.property;

import com.salesync.typeservice.entities.Property;

import java.util.List;
import java.util.UUID;

public interface IPropertyService {
    Property getProperty(UUID propertyId);

    List<Property> getAllProperties();
}
