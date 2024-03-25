package org.salesync.record_service.repositories.record;

import org.salesync.record_service.entities.Record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

public interface RecordRepository extends JpaRepository<Record, UUID>, RecordCustomRepository {

    List<Record> findByTypeId(UUID typeId);
}
