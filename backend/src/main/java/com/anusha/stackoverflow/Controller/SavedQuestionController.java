package com.anusha.stackoverflow.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anusha.stackoverflow.Models.Organisation;
import com.anusha.stackoverflow.Models.Questions;
import com.anusha.stackoverflow.Models.Users;
import com.anusha.stackoverflow.Repository.QuestionsRepository;
import com.anusha.stackoverflow.Repository.UserRepository;
import com.anusha.stackoverflow.Services.SavedQuestionService;

@RestController
@RequestMapping("/stackoverflow")
public class SavedQuestionController {

    @Autowired
    private SavedQuestionService service;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private QuestionsRepository queRepo;
    
    @PostMapping("/saved/{questionId}")
    public ResponseEntity<String> saveQuestion(@PathVariable int questionId, @RequestHeader("userId") int userId) {
        Users user = userRepo.getUserById(userId);
        Organisation org = user.getOrganisation();
        Questions question = queRepo.getQuestionById(questionId);

        service.saveQuestion(user, question, org);
        return ResponseEntity.ok("Question saved");
    }

    @GetMapping("/saved")
    public ResponseEntity<List<Questions>> getSavedQuestions( @RequestHeader("Authorization") String authHeader, @RequestHeader("userId") int userId, @RequestHeader("orgId") int orgId) {
        return ResponseEntity.ok(service.getSavedQuestions(userId, orgId));
    }

    @DeleteMapping("/unsave/{questionId}")
    public ResponseEntity<String> unsaveQuestion(@RequestHeader("userId") int userId, @PathVariable int questionId) {
        service.unsaveQuestion(userId, questionId);
        return ResponseEntity.ok("Question unsaved successfully");
    }


}
