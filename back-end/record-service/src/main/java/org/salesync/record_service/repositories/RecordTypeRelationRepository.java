package org.salesync.record_service.repositories;

import org.salesync.record_service.entities.RecordTypeRelation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface RecordTypeRelationRepository extends JpaRepository<RecordTypeRelation, UUID> {
    List<RecordTypeRelation> findBySourceRecordId(UUID sourceRecordId);

    //query to get by source record id
    @Query("select r from RecordTypeRelation r where r.sourceRecord.id =:id")
    List<RecordTypeRelation> findSrcRecordId(@Param("id") UUID id);

    @Query("select r from RecordTypeRelation r where r.destinationRecord.id =:id")
    List<RecordTypeRelation> findAllByDestRecordId(@Param("id") UUID id);
}
