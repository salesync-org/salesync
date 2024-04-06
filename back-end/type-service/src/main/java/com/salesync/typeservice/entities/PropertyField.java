package com.salesync.typeservice.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
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


    @JsonProperty("label")
    private String label;
    @JsonProperty("item_value")
    private String itemValue;
    @JsonProperty("is_required")
    private Boolean isRequired;

    @JsonProperty("is_key")
    private Boolean isKey;



    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "property_id")
    private Property property;


    @JsonProperty("field")
    @ManyToOne
    @JoinColumn(name = "field_id")
    private Field field;


    @OneToMany(mappedBy = "propertyField", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<TypePropertyField> typePropertyFields;

}
