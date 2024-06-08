package org.salesync.record_service.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "record_type_relation")
@AttributeOverride(name = "id", column = @Column(name = "record_type_relation_id"))
public class RecordTypeRelation extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "source_record_id")
    private Record sourceRecord;

    @ManyToOne
    @JoinColumn(name = "destination_record_id")
    private Record destinationRecord;

    private UUID typeRelationId;
}
