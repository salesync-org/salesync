package com.salesync.typeservice.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "relation")
@AttributeOverride(name="id",column = @Column(name="relation_id"))
public class Relation extends BaseEntity  {
    private String name;

    @OneToMany(mappedBy = "relation", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<TypeRelation> typeRelations;
}
