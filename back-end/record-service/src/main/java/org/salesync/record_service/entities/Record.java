package org.salesync.record_service.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private String name;
    private UUID typeId;
    private UUID userId;
    private UUID currentStageId;
    @OneToMany(mappedBy = "record", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<RecordProperty> recordProperties;
    @OneToMany(mappedBy = "sourceRecord", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<RelationshipOfRecords> sourceRelationships;
    @OneToMany(mappedBy = "destinationRecord", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<RelationshipOfRecords> destinationRelationships;
}
