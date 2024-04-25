package com.salesync.typeservice.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "stage")
@AttributeOverride(name = "id", column = @Column(name = "stage_id"))
public class Stage extends BaseEntity {

    private String name;

    @JsonProperty("sequence_number")
    private Integer sequenceNumber;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "type_id")
    private Type type;
}
