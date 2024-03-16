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
@Table(name = "property_field")
@AttributeOverride(name="id",column = @Column(name="property_field_id"))
public class PropertyField extends BaseEntity {

    private String label;
    private String name;
    private Boolean isRequired;
    private Boolean isKey;
    @ManyToOne
    @JoinColumn(name = "property_id")
    private Property property;
    @ManyToOne
    @JoinColumn(name = "field_id")
    private Field field;
    @OneToMany(mappedBy = "propertyField", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<PropertyFieldType> propertyFieldTypes;
}
