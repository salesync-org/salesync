package org.salesync.record_service.repositories;

import org.salesync.record_service.entities.RecordTypeRelation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface RecordTypeRelationRepository extends JpaRepository<RecordTypeRelation, UUID> {
}
