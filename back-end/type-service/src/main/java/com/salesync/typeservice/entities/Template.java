package com.salesync.typeservice.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.salesync.typeservice.enums.TemplateEnum;
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
@Table(name = "template")
@AttributeOverride(name = "id", column = @Column(name = "template_id"))
public class Template extends BaseEntity {
    @Enumerated(EnumType.STRING)
    private TemplateEnum name;

    @OneToMany(mappedBy = "template", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Type> types;
}
