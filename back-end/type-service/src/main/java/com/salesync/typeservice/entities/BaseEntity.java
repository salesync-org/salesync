package com.salesync.typeservice.entities;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.UUID;


@MappedSuperclass
@Getter
@Setter
public class BaseEntity {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.UUID)
    protected UUID id;

}
