package org.salesync.record_service.repositories;

import org.salesync.record_service.entities.RecordType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface RecordTypeRepository extends JpaRepository<RecordType, UUID> {

    List<RecordType> findByTypeId(UUID typeId);
}
