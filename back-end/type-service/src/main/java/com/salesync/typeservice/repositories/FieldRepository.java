package com.salesync.typeservice.repositories;

import com.salesync.typeservice.entities.Field;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface FieldRepository extends JpaRepository<Field, UUID> {
}
