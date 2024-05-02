package com.salesync.typeservice.repositories;

import com.salesync.typeservice.entities.Type;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface TypeRepository extends JpaRepository<Type, UUID> {
    List<Type> findAllByCompanyName(String companyName);
    @Query(value = "CALL init_company(:companyName)", nativeQuery = true
    )
    void initializeCompany(String companyName);
}
