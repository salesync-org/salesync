package com.salesync.typeservice.repositories;

import com.salesync.typeservice.entities.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

public interface TypeRepository extends JpaRepository<Type, UUID> {
    List<Type> findAllByCompanyName(String companyName);

    @Transactional
    @Modifying
    @Query(value = "CALL init_company(:companyName)", nativeQuery = true
    )
    void initializeCompany(String companyName);
}
