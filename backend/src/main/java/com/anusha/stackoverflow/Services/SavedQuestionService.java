package com.anusha.stackoverflow.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.anusha.stackoverflow.Models.Organisation;
import com.anusha.stackoverflow.Models.Questions;
import com.anusha.stackoverflow.Models.SavedQuestions;
import com.anusha.stackoverflow.Models.Users;
import com.anusha.stackoverflow.Repository.SavedQuestionRepository;

@Service
public class SavedQuestionService {
    
    @Autowired
    private SavedQuestionRepository savedRepo;

    public void saveQuestion(Users user, Questions question, Organisation org) {
        if (!savedRepo.existsByUserIdAndQuestionId(user.getId(), question.getId())) {
            SavedQuestions saved = new SavedQuestions();
            saved.setUser(user);
            saved.setQuestion(question);
            saved.setOrganisation(org);
            savedRepo.save(saved);
        }
    }

    public List<Questions> getSavedQuestions(int userId, int orgId) {
        return savedRepo.findByUserIdAndOrganisationId(userId, orgId)
                        .stream().map(SavedQuestions::getQuestion).toList();
    }

    public void unsaveQuestion(int userId, int questionId) {
        List<SavedQuestions> savedList = savedRepo.findByUserIdAndQuestionId(userId, questionId);
        savedList.forEach(savedRepo::delete);
        
    }

}
