package com.salesync.typeservice.entities;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.UUID;


@MappedSuperclass
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@Data

public class BaseEntity {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.UUID)
    protected UUID id;

    @Version
    protected Long version;
}
