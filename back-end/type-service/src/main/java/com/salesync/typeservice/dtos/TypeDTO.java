package com.salesync.typeservice.dtos;

import java.util.UUID;

public class TypeDTO {
    UUID id;
    String name;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public TypeDTO(UUID id, String name) {
        this.id = id;
        this.name = name;
    }

    public TypeDTO(String name) {
        this.name = name;
    }
}
