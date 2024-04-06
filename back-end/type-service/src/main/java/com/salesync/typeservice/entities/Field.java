package com.salesync.typeservice.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
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
@Table(name = "field")
@AttributeOverride(name="id",column = @Column(name="field_id"))
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class Field extends BaseEntity {
    @Column(name = "input_type")
    private String inputType;

    @Column(name = "is_multiple_value")
    private Boolean isMultipleValue;

    @OneToMany(mappedBy = "field", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<PropertyField> propertyFields;

}
