package com.salesync.typeservice.repositories;

import com.salesync.typeservice.entities.Stage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface StageRepository extends JpaRepository<Stage, UUID> {
    Optional<Stage> findTopByTypeIdOrderBySequenceNumberDesc(UUID typeId);
    Optional<Stage> findByTypeIdAndSequenceNumber(UUID typeId, Integer sequenceNumber);
}
