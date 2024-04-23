package org.salesync.record_service.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "record_stage")
@AttributeOverride(name = "id", column = @Column(name = "record_stage_id"))
public class RecordStage extends BaseEntity {

    private UUID stageId;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "record_id")
    @JsonIgnore
    private Record record;
}
