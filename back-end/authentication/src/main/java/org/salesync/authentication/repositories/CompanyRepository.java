package org.salesync.authentication.repositories;

import org.salesync.authentication.entities.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CompanyRepository extends JpaRepository<Company, UUID> {
    Optional<Company> findCompaniesByName(String name);
}
