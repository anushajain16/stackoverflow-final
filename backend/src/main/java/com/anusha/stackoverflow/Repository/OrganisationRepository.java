package com.anusha.stackoverflow.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.anusha.stackoverflow.Models.Organisation;

@Repository
public interface OrganisationRepository extends JpaRepository<Organisation,Integer>{
    boolean existsByName(String name);
    Optional<Organisation> findById(int id);
    
} 