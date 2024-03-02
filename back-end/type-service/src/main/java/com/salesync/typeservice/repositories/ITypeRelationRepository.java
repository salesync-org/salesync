package com.salesync.typeservice.repositories;

import com.salesync.typeservice.entities.TypeRelation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


public interface ITypeRelationRepository extends JpaRepository<TypeRelation, UUID>{

    List<TypeRelation> findBySourceTypeIdAndDestinationTypeId(UUID sourceId, UUID destinationId);
}
