package com.salesync.typeservice.repositories;

import com.salesync.typeservice.entities.Type;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TypeRepository extends JpaRepository<Type, UUID> {
    List<Type> findAllByCompanyName(String companyName);
}
