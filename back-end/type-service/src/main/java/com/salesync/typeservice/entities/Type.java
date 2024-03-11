package com.salesync.typeservice.entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "type")
@AttributeOverride(name="id",column = @Column(name="type_id"))
public class Type extends BaseEntity  {


    private String name;

    @OneToMany(mappedBy = "sourceType", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<TypeRelation> sourceTypeRelations;

    @OneToMany(mappedBy = "destinationType", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<TypeRelation> destinationTypeRelations;

    @OneToMany(mappedBy = "type", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<TypeProperty> typeProperties;

}
