package org.salesync.record_service.entities;
import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "property")
@AttributeOverride(name="id",column = @Column(name="property_id"))
public class Property extends BaseEntity  {
    private String name;
    private String label;
    private String defaultValue;

}
