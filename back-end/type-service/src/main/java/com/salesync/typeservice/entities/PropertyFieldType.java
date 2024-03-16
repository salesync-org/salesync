package com.salesync.typeservice.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "property_field_type")
@AttributeOverride(name="id",column = @Column(name="property_field_type_id"))
public class PropertyFieldType extends BaseEntity {
    private String value;
    @ManyToOne
    @JoinColumn(name = "property_field_id")
    private PropertyField propertyField;
    @ManyToOne
    @JoinColumn(name = "type_id")
    private Type type;
}
