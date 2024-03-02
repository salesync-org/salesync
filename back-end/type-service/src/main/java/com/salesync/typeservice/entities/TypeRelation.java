package com.salesync.typeservice.entities;

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
@Table(name = "type_relation")
@AttributeOverride(name="id",column = @Column(name="type_relation_id"))
public class TypeRelation extends BaseEntity  {

    @ManyToOne
    @JoinColumn(name = "source_id")
    private Type sourceType;

    private String sourceTypeLabel;

    @ManyToOne
    @JoinColumn(name = "destination_id")
    private Type destinationType;

    private String destinationLabel;

    @ManyToOne
    @JoinColumn(name = "relation_id")
    private Relation relation;


}