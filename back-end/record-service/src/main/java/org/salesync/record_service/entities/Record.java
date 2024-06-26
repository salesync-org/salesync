package org.salesync.record_service.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLRestriction;

import java.util.List;
import java.util.UUID;

@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "record")
@AttributeOverride(name = "id", column = @Column(name = "record_id"))
@SQLRestriction("deleted=false")
public class Record extends BaseEntity {
    private String name;
    private UUID userId;

    @JsonIgnore
    @Column(name = "company_name")
    private String companyName;

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

    private boolean deleted = Boolean.FALSE;
}
