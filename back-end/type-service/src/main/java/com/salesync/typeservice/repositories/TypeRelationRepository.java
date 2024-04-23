package com.salesync.typeservice.repositories;

import com.salesync.typeservice.entities.TypeRelation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TypeRelationRepository extends JpaRepository<TypeRelation, UUID> {

    Optional<TypeRelation> findBySourceTypeIdAndDestinationTypeIdAndRelationId(UUID sourceId, UUID destinationId, UUID relationId);

    List<TypeRelation> findAllBySourceTypeId(UUID sourceType_id);
}
