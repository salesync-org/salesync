package org.salesync.record_service.repositories;

import org.salesync.record_service.entities.Record;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

public interface RecordRepository extends JpaRepository<Record, UUID> {
    @Query(value = "SELECT * FROM get_filtered_records(:userId, :name, :typeId, :searchTerm, :isAsc)", nativeQuery = true
    )
    Page<Record> getFilteredRecord(UUID userId, String name, UUID typeId, String searchTerm, boolean isAsc, Pageable pageable);

    @Query(value = "SELECT * FROM get_filtered_records_and_sort_by_name(:userId, :typeId, :searchTerm, :isAsc)", nativeQuery = true
    )
    Page<Record> getFilteredRecordsAndOrderByName(UUID userId, UUID typeId, String searchTerm, boolean isAsc, Pageable pageable);
}
