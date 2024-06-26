package com.salesync.typeservice.repositories;

import com.salesync.typeservice.entities.Template;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TemplateRepository extends JpaRepository<Template, UUID> {
}
