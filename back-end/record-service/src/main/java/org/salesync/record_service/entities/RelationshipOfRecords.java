package org.salesync.record_service.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "relationship_of_records")
@AttributeOverride(name = "id", column = @Column(name = "record_relation_id"))
public class RelationshipOfRecords extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "source_record_id")
    private Record sourceRecord;

    @ManyToOne
    @JoinColumn(name = "destination_record_id")
    private Record destinationRecord;

    private UUID relationshipId;
}
