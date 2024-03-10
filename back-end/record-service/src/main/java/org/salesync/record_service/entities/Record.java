package org.salesync.record_service.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "record")
@AttributeOverride(name="id",column = @Column(name="record_id"))
public class Record extends BaseEntity {
    @Column(name = "record_name")
    private String name;
    private UUID typeId;
    private UUID userId;
    private String stage;
    @OneToMany(mappedBy = "record", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RecordProperty> recordProperties;
}
