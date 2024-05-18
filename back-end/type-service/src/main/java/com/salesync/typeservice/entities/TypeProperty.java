package com.salesync.typeservice.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "type_property")
@AttributeOverride(name = "id", column = @Column(name = "type_property_id"))
public class TypeProperty extends BaseEntity {
    private String name;

    private String label;

    private Integer sequence;

    @JsonProperty("default_value")
    @Column(name = "default_value")
    private String defaultValue;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "type_id")
    private Type type;

    @ManyToOne
    @JoinColumn(name = "property_id")
    private Property property;

    @JsonProperty("fields")
    @OneToMany(mappedBy = "typeProperty", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TypePropertyField> typePropertyFields;
}
