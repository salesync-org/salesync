package com.salesync.typeservice.services.property;

import com.salesync.typeservice.entities.Property;

import java.util.UUID;

public interface IPropertyService {
    Property getProperty(UUID propertyId);
}
