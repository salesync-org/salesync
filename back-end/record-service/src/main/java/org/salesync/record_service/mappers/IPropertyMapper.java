package org.salesync.record_service.mappers;

import org.salesync.record_service.dtos.PropertyDTO;
import org.salesync.record_service.entities.Property;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface IPropertyMapper {
    IPropertyMapper INSTANCE = Mappers.getMapper(IPropertyMapper.class);

    PropertyDTO propertyToPropertyDTO(Property property);

    Property propertyDTOToProperty(PropertyDTO propertyDTO);
}
