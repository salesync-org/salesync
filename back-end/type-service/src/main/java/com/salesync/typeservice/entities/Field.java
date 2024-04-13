package com.salesync.typeservice.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "field")
@AttributeOverride(name="id",column = @Column(name="field_id"))
public class Field extends BaseEntity {
    @JsonProperty("input_type")
    @Column(name = "input_type")
    private String inputType;

    @JsonProperty("is_multiple_value")
    @Column(name = "is_multiple_value")
    private Boolean isMultipleValue;

    @OneToMany(mappedBy = "field", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<PropertyField> propertyFields;

}
