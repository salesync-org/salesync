package com.salesync.typeservice.entities;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "field")
@AttributeOverride(name="id",column = @Column(name="field_id"))
public class Field extends BaseEntity {
    private String name;
    private String inputType;
    private Boolean isMultipleValue;
}
