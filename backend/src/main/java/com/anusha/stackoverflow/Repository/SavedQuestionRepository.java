package com.anusha.stackoverflow.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.anusha.stackoverflow.Models.SavedQuestions;

@Repository
public interface SavedQuestionRepository extends JpaRepository<SavedQuestions,Integer> {
    List<SavedQuestions> findByUserIdAndQuestionId(int userId, int question_id);
    List<SavedQuestions> findByUserIdAndOrganisationId(int userId, int organisationId);
    boolean existsByUserIdAndQuestionId(int userId, int questionId);
}
