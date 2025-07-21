package com.anusha.stackoverflow.Repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.anusha.stackoverflow.Models.Answer;
import com.anusha.stackoverflow.Models.Users;

import jakarta.transaction.Transactional;

@Repository
public interface AnswerRepository extends JpaRepository<Answer,Integer>{
    List<Users> findByUserId(int userId);
    List<Answer> findByQuestionsId(int questionId);
    Answer findById(int id);
    
    @Transactional
    @Modifying
    @Query(
        value = "DELETE FROM answer a WHERE a.question_id = :questionId",
        nativeQuery = true
    )
    void deleteByQuestionId(@Param("questionId") int questionId);

    @Query(
        value = "SELECT COUNT(id) FROM answer a WHERE a.user_id = :userId",
        nativeQuery = true)
    Long countAnswersByUser(@Param("userId") int userId);

    @Query(
        value = "SELECT SUM(upvotes) from answer a where a.user_id = :userId",
        nativeQuery = true)
    Long sumUpvotes(@Param("userId") int userId);

    @Query(
        value = "SELECT SUM(downvotes) from answer a where a.user_id = :userId",
        nativeQuery = true)
    Long sumDownVotes(@Param("userId") int userId);

    @Query(
        value = "SELECT COUNT(*) FROM answer a WHERE a.question_id in (Select id from questions q where q.organisation_id = :orgId)",
        nativeQuery = true)
    Long countAnswersByOrg(@Param("orgId") int orgId);

}
