package org.salesync.record_service.repositories;

import org.salesync.record_service.entities.Record;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface RecordRepository extends JpaRepository<Record, UUID> {

    List<Record> findByTypeId(UUID typeId);
}
