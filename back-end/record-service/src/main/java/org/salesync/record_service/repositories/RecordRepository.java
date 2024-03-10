package org.salesync.record_service.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface RecordRepository extends JpaRepository<Record, UUID> {
}
