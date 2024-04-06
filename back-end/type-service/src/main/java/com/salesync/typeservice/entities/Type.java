package com.salesync.typeservice.entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
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
    @JsonProperty("properties")


    private List<TypeProperty> typeProperties;

    @OneToMany(mappedBy = "type", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Stage> stages;

    @ManyToOne
    @JoinColumn(name = "template_id")
    private Template template;

}
