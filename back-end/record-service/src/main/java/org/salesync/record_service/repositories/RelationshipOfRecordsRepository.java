package org.salesync.record_service.repositories;

import org.salesync.record_service.entities.RelationshipOfRecords;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface RelationshipOfRecordsRepository extends JpaRepository<RelationshipOfRecords, UUID> {
}
