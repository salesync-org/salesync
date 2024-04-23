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
@AttributeOverride(name = "id", column = @Column(name = "record_id"))
public class Record extends BaseEntity {
    private String name;
    private UUID userId;

    @OneToMany(mappedBy = "record", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<RecordTypeProperty> recordProperties;

    @OneToMany(mappedBy = "sourceRecord", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<RecordTypeRelation> sourceRelationships;

    @OneToMany(mappedBy = "destinationRecord", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<RecordTypeRelation> destinationRelationships;

    @OneToOne(mappedBy = "record", cascade = CascadeType.ALL)
    private RecordType recordType;

    @OneToOne(mappedBy = "record", cascade = CascadeType.ALL)
    private RecordStage recordStage;
}
