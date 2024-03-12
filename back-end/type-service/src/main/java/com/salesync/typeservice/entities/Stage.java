package com.salesync.typeservice.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "stage")
@AttributeOverride(name="id",column = @Column(name="stage_id"))
public class Stage extends BaseEntity {

    private String name;
    private Integer weight;
    @ManyToOne
    @JoinColumn(name = "type_id")
    private Type type;
}
