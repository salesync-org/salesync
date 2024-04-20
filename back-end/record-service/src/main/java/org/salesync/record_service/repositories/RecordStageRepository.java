package org.salesync.record_service.repositories;

import org.salesync.record_service.entities.Record;
import org.salesync.record_service.entities.RecordStage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface RecordStageRepository extends JpaRepository<RecordStage, UUID> {
    RecordStage findByRecordId(UUID recordId);
    void deleteByStageId(UUID stageId);
}
