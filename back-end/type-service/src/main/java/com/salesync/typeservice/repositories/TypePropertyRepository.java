package com.salesync.typeservice.repositories;

import com.salesync.typeservice.entities.TypeProperty;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TypePropertyRepository extends JpaRepository<TypeProperty, UUID>{
}
