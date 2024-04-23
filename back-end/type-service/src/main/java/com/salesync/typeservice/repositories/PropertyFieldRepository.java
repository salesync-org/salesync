package com.salesync.typeservice.repositories;

import com.salesync.typeservice.entities.PropertyField;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PropertyFieldRepository extends JpaRepository<PropertyField, UUID> {
}
