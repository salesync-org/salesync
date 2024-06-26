package com.salesync.typeservice.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@EqualsAndHashCode(callSuper = true)
@Data
@Table(name = "type_property_field")
@AttributeOverride(name = "id", column = @Column(name = "type_property_field_id"))
public class TypePropertyField extends BaseEntity {
    @Column(name = "item_value")
    @JsonProperty("item_value")
    private String itemValue;

    @ManyToOne
    @JoinColumn(name = "property_field_id")
    @JsonProperty("property_field")
    private PropertyField propertyField;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "type_property_id")
    private TypeProperty typeProperty;
}
