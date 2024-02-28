package com.salesync.typeservice.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.UUID;

@Data
@Entity
@Builder
@NoArgsConstructor
//@EntityListeners(AuditingEntityListener.class)
@Table(name = "type")
public class Type {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "type_id")
    private UUID id;

    @Column(name = "name")
    private String name;

    public Type(String name) {
        this.name = name;
    }

    public Type(UUID id, String name) {
        this.id = id;
        this.name = name;
    }
}
