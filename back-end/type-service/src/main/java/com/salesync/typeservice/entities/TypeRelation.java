package com.salesync.typeservice.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "type_relation", uniqueConstraints = {@UniqueConstraint(columnNames = {"source_id", "destination_id", "relation_id"})
}
)
@AttributeOverride(name = "id", column = @Column(name = "type_relation_id"))
public class TypeRelation extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "source_id")
    private Type sourceType;

    private String sourceTypeLabel;

    @ManyToOne
    @JoinColumn(name = "destination_id")
    private Type destinationType;

    @Column(name = "destination_label")
    private String destinationLabel;

    @ManyToOne
    @JoinColumn(name = "relation_id")
    private Relation relation;
}
