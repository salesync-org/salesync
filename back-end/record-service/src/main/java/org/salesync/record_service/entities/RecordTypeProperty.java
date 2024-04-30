package org.salesync.record_service.entities;

import jakarta.persistence.*;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "record_type_property")
@AttributeOverride(name = "id", column = @Column(name = "record_type_property_id"))
public class RecordTypeProperty extends BaseEntity {

    @Column(name = "name")
    private String propertyName;
    private String itemValue;
    private String recordTypePropertyLabel;

    @ManyToOne
    @JoinColumn(name = "record_id")
    private Record record;
}
