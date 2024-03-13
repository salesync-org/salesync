package com.salesync.typeservice.repositories;

import com.salesync.typeservice.entities.Property;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PropertyRepository extends JpaRepository<Property, UUID> {
}
