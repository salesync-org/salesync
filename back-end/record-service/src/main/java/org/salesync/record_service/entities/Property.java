package org.salesync.record_service.entities;
import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "type")
@AttributeOverride(name="id",column = @Column(name="type_id"))
public class Property extends BaseEntity  {
    private String name;

}
