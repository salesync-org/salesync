package com.salesync.typeservice.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.RequiredArgsConstructor;

@Builder
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "type_property_field")
@AttributeOverride(name="id",column = @Column(name="type_property_field"))
public class TypePropertyField extends BaseEntity {

    private String value;

    @ManyToOne
    @JoinColumn(name = "type_property_id")
    private TypeProperty typeProperty;

    @ManyToOne
    @JoinColumn(name = "field_id")
    private Field field;
}
