package com.anusha.stackoverflow.Repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.anusha.stackoverflow.Models.QuestionTag;
import com.anusha.stackoverflow.Models.Tags;

import jakarta.transaction.Transactional;

@Repository
public interface QueTagsRepository extends JpaRepository<QuestionTag,Integer>{
    QuestionTag findById(int id);
    List<QuestionTag> findAllByTag(Tags tag);
    
    @Transactional
    @Modifying
    @Query(
        value = "DELETE FROM question_tags qt WHERE qt.question_id = :questionId",
        nativeQuery = true
    )
    void deleteByQuestionId(@Param("questionId") int questionId);

    @Query(
        value = "Select count(*) from question_tags qt where question_id in (Select id from questions q where q.organisation_id = :orgId)",
        nativeQuery = true
    )
    Long countByOrgId(@Param("orgId") int orgId);
}
