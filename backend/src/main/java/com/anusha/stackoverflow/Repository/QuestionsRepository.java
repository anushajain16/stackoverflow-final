package com.anusha.stackoverflow.Repository;

import org.springframework.stereotype.Repository;
import com.anusha.stackoverflow.Models.Questions;
import com.anusha.stackoverflow.Models.enums.Cat;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface QuestionsRepository extends JpaRepository<Questions,Integer> {
    List<Questions> findByOrganisationId(int organisation_id);
    List<Questions> findByCat(Cat category);
    List<Questions> findByUserId(int users_id);
    Optional<Questions> findById(int id);

    List<Questions> findByCatAndOrganisationId(Cat category, int organisation_id);
    Questions getQuestionById(int id);

    @Query(
        value = "SELECT COUNT(id) FROM questions q WHERE q.users_id = :userId",
        nativeQuery = true
    )
    Long countQuestionsByUser(@Param("userId") int userId);

    @Query(
        value = "SELECT COUNT(*) FROM questions q WHERE q.users_id = :userId AND q.id NOT IN (SELECT question_id FROM answer)",
        nativeQuery = true
    )
    Long countUnansweredQuestionsByUser(@Param("userId") int userId);


    @Query(
        value = "SELECT YEAR(created_at), MONTH(created_at), COUNT(id) FROM questions WHERE users_id = :userId GROUP BY YEAR(created_at), MONTH(created_at)",
        nativeQuery = true
    )
    List<Object[]> findMonthlyActivity(@Param("userId") int userId);

    @Query(
        value = "SELECT cat, COUNT(id) FROM questions WHERE users_id = :userId GROUP BY cat",
        nativeQuery = true
    )
    List<Object[]> countQuestionsByCategory(@Param("userId") int userId);


    @Query(
        value = "SELECT SUM(views) FROM questions q WHERE q.users_id = :userId",
        nativeQuery = true)
    Long totalViews(@Param("userId") int userId);

    @Query(
        value="SELECT * FROM questions q WHERE ( LOWER(q.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(q.body) LIKE LOWER(CONCAT('%',:keyword,'%'))) AND q.organisation_id = :orgId",
        nativeQuery = true
    )
    List<Questions> searchByKeywordAndOrg(@Param("keyword") String keyword, @Param("orgId") int organisationId);

    @Query(
        value = "Select COUNT(*) from questions q where organisation_id = :orgId",
        nativeQuery = true
    )
    Long countQuestionsByOrg(@Param("orgId") int orgId);

    @Query(
        value = "SELECT SUM(upvotes) from questions q where q.organisation_id = :orgId",
        nativeQuery = true
    )
    Long countUpvotes(@Param("orgId") int orgId);

    @Query(
        value = "SELECT SUM(downvotes) from questions q where q.organisation_id = :orgId",
        nativeQuery = true
    )
    Long countDownvotes(@Param("orgId") int orgId);

    @Query(
        value = "SELECT SUM(views) from questions q where q.organisation_id = :orgId",
        nativeQuery = true
    )
    Long countViews(@Param("orgId") int orgId);

    @Query(
        value = "SELECT COUNT(*) FROM questions q WHERE q.organisation_id = :orgId AND q.id NOT IN (SELECT question_id FROM answer)",
        nativeQuery = true
    )
    Long countUnansweredQuestionsByOrg(@Param("orgId") int orgId);

    @Query(
        value = "SELECT YEAR(created_at), MONTH(created_at), COUNT(id) FROM questions WHERE organisation_id = :orgId GROUP BY YEAR(created_at), MONTH(created_at)",
        nativeQuery = true
    )
    List<Object[]> findMonthlyActivityByOrg(@Param("orgId") int orgId);

    @Query(
        value = "SELECT cat, COUNT(id) FROM questions WHERE organisation_id = :orgId GROUP BY cat",
        nativeQuery = true
    )
    List<Object[]> countQuestionsByCategoryAndOrg(@Param("orgId") int orgId);

    @Query(
        value = "Select q.title, q.upvotes as upvotes , u.name from users u join questions q on u.id = q.users_id where u.organisation_id = :orgId order by upvotes desc LIMIT 5;",
        nativeQuery = true
    )
    List<Object[]> findTopQuestions(@Param("orgId") int orgId);

}
