package com.salesync.typeservice.repositories;

import com.salesync.typeservice.entities.Type;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ITypeRepository extends JpaRepository<Type,String> {
}
