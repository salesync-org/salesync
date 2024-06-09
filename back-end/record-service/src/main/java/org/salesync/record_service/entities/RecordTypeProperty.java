package org.salesync.record_service.entities;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.SQLRestriction;

@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "record_type_property")
@AttributeOverride(name = "id", column = @Column(name = "record_type_property_id"))
@SQLRestriction("deleted=false")
public class RecordTypeProperty extends BaseEntity {

    @Column(name = "name")
    private String propertyName;
    private String itemValue;
    private String recordTypePropertyLabel;

    @ManyToOne
    @JoinColumn(name = "record_id")
    private Record record;

    private boolean deleted = Boolean.FALSE;
}
