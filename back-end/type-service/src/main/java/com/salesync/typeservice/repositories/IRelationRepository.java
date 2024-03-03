package com.salesync.typeservice.repositories;

import com.salesync.typeservice.entities.Relation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface IRelationRepository extends JpaRepository<Relation, UUID> {
}
