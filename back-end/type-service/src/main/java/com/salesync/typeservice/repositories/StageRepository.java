package com.salesync.typeservice.repositories;

import com.salesync.typeservice.entities.Stage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface StageRepository extends JpaRepository<Stage, UUID> {
    Optional<Stage> findTopByTypeIdOrderBySequenceNumberDesc(UUID typeId);
    Optional<Stage> findTopByTypeIdOrderBySequenceNumberAsc(UUID typeId);
    Optional<Stage> findByTypeIdAndSequenceNumber(UUID typeId, Integer sequenceNumber);
    List<Stage> findAllByTypeIdOrderBySequenceNumberAsc(UUID typeId);
}
