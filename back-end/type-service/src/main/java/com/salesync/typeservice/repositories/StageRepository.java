package com.salesync.typeservice.repositories;

import com.salesync.typeservice.entities.Stage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface StageRepository extends JpaRepository<Stage, UUID> {
    Optional<Stage> findTopByTypeIdOrderBySequenceNumberDesc(UUID typeId);
    Optional<Stage> findByTypeIdAndSequenceNumber(UUID typeId, Integer sequenceNumber);
    List<Stage> findAllByTypeIdOrderBySequenceNumberAsc(UUID typeId);

    @Query(value = "SELECT stage_id FROM stage WHERE type_id = ?1 and name = ?2", nativeQuery = true)
    public UUID getStageIdByTypeIdAndSequenceNumber(UUID typeId, String stageName);
}
