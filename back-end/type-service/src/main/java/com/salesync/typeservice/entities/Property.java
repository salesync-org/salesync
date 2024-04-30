package com.salesync.typeservice.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "property")
@AttributeOverride(name = "id", column = @Column(name = "property_id"))
public class Property extends BaseEntity {
    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TypeProperty> typeProperties;

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true)
//    @JsonIgnore
    private List<PropertyField> propertyFields;
}
