package com.anusha.stackoverflow.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.anusha.stackoverflow.Models.Tags;

@Repository
public interface TagsRepository extends JpaRepository<Tags,Integer>{
    Optional<Tags> findById(int id);
    Tags findByName(String name);
    
}
