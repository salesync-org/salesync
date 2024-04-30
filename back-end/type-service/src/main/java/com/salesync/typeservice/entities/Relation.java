package com.salesync.typeservice.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "relation")
@AttributeOverride(name = "id", column = @Column(name = "relation_id"))
public class Relation extends BaseEntity {
    private String name;

    @OneToMany(mappedBy = "relation", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<TypeRelation> typeRelations;

    @OneToOne
    @JoinColumn(name = "inverse_relation_id")
    private Relation inverseRelation;
}
