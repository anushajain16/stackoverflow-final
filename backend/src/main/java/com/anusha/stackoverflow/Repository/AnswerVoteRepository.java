package com.anusha.stackoverflow.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.anusha.stackoverflow.Models.Answer;
import com.anusha.stackoverflow.Models.AnswerVote;
import com.anusha.stackoverflow.Models.Users;

import jakarta.transaction.Transactional;

public interface AnswerVoteRepository extends JpaRepository<AnswerVote,Integer> {
    AnswerVote findByAnswerAndUser(Answer answer, Users user);

    void deleteByAnswer(Answer answer);

    @Transactional
    @Modifying
    @Query(
        value = "DELETE FROM answer_votes av WHERE av.answer_id = :answerId",
        nativeQuery = true
    )
    void deleteByAnswerId(@Param("answerId") int answerId);

    @Modifying
    @Transactional
    @Query(
        value = "DELETE FROM answer_votes av WHERE av.answer_id IN (SELECT a.id FROM answer a WHERE a.question_id = :questionId)",
        nativeQuery = true)
    void deleteByAnswerQuestionId(@Param("questionId") int questionId);

    

}
