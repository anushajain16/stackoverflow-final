package com.anusha.stackoverflow.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.anusha.stackoverflow.Models.QuestionVote;
import com.anusha.stackoverflow.Models.Questions;
import com.anusha.stackoverflow.Models.Users;

import jakarta.transaction.Transactional;

public interface QuestionVoteRepository extends JpaRepository<QuestionVote,Integer>{
    QuestionVote findByQuestionAndUser(Questions question, Users user);

    @Transactional
    @Modifying
    @Query(
        value = "DELETE FROM question_votes qv WHERE qv.question_id = :questionId",
        nativeQuery = true
    )
    void deleteByQuestionId(@Param("questionId") int questionId);
    

}
