package org.salesync.record_service.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "record_property")
@AttributeOverride(name="id",column = @Column(name="record_property_id"))
public class RecordProperty extends BaseEntity{

    private UUID propertyId;
    @ManyToOne
    @JoinColumn(name = "record_id")
    private Record record;
}
