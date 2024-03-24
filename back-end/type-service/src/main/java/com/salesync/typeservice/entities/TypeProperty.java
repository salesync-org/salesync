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
@Table(name = "type_property")
@AttributeOverride(name="id",column = @Column(name="type_property_id"))
public class TypeProperty extends BaseEntity {
    private String name;
    private String label;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private Type type;

    @ManyToOne
    @JoinColumn(name = "property_id")
    private Property property;

    @OneToMany(mappedBy = "typeProperty", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<TypePropertyField> typePropertyFields;
}
