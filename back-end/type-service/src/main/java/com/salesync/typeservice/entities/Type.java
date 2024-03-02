package com.salesync.typeservice.entities;
import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "type")
@AttributeOverride(name="id",column = @Column(name="type_id"))
public class Type extends BaseEntity  {


    private String name;

}
