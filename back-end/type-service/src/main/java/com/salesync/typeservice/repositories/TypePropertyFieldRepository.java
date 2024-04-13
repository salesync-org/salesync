package com.salesync.typeservice.repositories;

import com.salesync.typeservice.entities.TypePropertyField;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TypePropertyFieldRepository extends JpaRepository<TypePropertyField, UUID>{
}
