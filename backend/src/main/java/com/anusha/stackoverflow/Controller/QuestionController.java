package com.anusha.stackoverflow.Controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.anusha.stackoverflow.Models.QuestionRequest;
import com.anusha.stackoverflow.Models.Questions;
import com.anusha.stackoverflow.Models.enums.Cat;
import com.anusha.stackoverflow.Repository.QuestionsRepository;
import com.anusha.stackoverflow.Services.QuestionService;

@RestController
@RequestMapping("/stackoverflow")
public class QuestionController {

    @Autowired
    private QuestionService service;

    @Autowired 
    private QuestionsRepository queRepo;

    @PostMapping("/questions") //Post a question 
    public ResponseEntity<?> postQuestion(@RequestBody Questions question){
        try{
            service.addQuestion(question);
            return ResponseEntity.ok("Question Posted");
        }
        catch(Exception e){
            return ResponseEntity.badRequest().body("Try again to post"+e);
        }
    }

    @GetMapping("/questions/{id}") //Getting questions according organisation
    public ResponseEntity<List<Questions>> getQuestion(@PathVariable("id") int id){
        List<Questions> list = service.getQuestions(id);
       return ResponseEntity.ok(list);
    }

    @GetMapping("/categories/{cat}") //Category wise questions 
    public ResponseEntity<List<Questions>> getCategory(@PathVariable("cat") String cat){
        List<Questions> list = service.getCategory(cat);
        return ResponseEntity.ok(list);
    }
    
    @GetMapping("/categories/{cat}/org/{orgId}")
    public ResponseEntity<List<Questions>> getCategoryByOrg(
        @PathVariable("cat") Cat cat,
        @PathVariable("orgId") int orgId
    ) {
        List<Questions> list = service.getCategoryByOrg(cat, orgId);
        return ResponseEntity.ok(list);
    }
    

    @GetMapping("/myQuestions/{id}") //
    public ResponseEntity<List<Questions>> myQuestions(@PathVariable("id") int id){
        List<Questions> list = service.myQuestions(id);
        return ResponseEntity.ok(list);
    }

    @PutMapping("/questions/{id}")
    public ResponseEntity<?> updateQuestion(@PathVariable int id, @RequestBody Questions updatedQuestion, Authentication authentication){
        service.updateQuestion(id, updatedQuestion,authentication);
        return ResponseEntity.ok("Question Updated Successfully");
    }

    @DeleteMapping("/questions/{id}")
    public ResponseEntity<?> deleteQuestion(@PathVariable int id, Authentication authentication){
        service.deleteQuestion(id, authentication);
        return ResponseEntity.ok("Deleted Question Successfully");
    }

    @PutMapping("/questions/{id}/view")
    public ResponseEntity<?> incrementViews(@PathVariable int id) {
        Questions q = queRepo.findById(id).orElseThrow(()->new RuntimeException("Question not found"));
        if (q == null) return ResponseEntity.notFound().build();
        q.setViews(q.getViews() + 1);
        queRepo.save(q);
        return ResponseEntity.ok("View incremented");
    }

    @PutMapping("/questions/{id}/vote")
    public ResponseEntity<?> voteQuestion(@PathVariable ("id") int id, @RequestParam int vote, @RequestParam int userId){
        try {
            service.voteQuestion(id, vote, userId);
            return ResponseEntity.ok("Vote recorded");
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PostMapping("/submit-question")
    public ResponseEntity<?> submitQuestionWithTags(@RequestBody QuestionRequest request) {
        Questions question = service.submitQuestionWithTags(request);
        return ResponseEntity.ok(question);
    }

    @GetMapping("/questions/search")
    public ResponseEntity<List<Questions>> searchQuestions(@RequestParam String query,@RequestParam int organisationId) {
        List<Questions> questions = service.searchQuestions(query, organisationId);
        return ResponseEntity.ok(questions);
    }

    



}