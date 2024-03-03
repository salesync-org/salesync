package org.salesync.record_service.repositories.type_repository;

import org.salesync.record_service.dtos.PropertyDTO;
import org.salesync.record_service.entities.Property;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface IPropertyRepository extends JpaRepository<Property, UUID> {
    public List findAll();
    public PropertyDTO findByTypeId(UUID typeId);
    public List findAllByTypeId(UUID typeId);
}