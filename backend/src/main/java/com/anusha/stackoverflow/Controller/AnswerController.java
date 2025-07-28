package com.anusha.stackoverflow.Controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.anusha.stackoverflow.Models.Answer;
import com.anusha.stackoverflow.Models.AnswerRequest;
import com.anusha.stackoverflow.Models.Questions;
import com.anusha.stackoverflow.Services.AnswerService;

@RestController
@RequestMapping("/stackoverflow")
public class AnswerController {

    @Autowired
    private AnswerService service;
    
   @PostMapping("/answer")
    private ResponseEntity<?> postAnswer(@RequestBody AnswerRequest request, Principal principal) {
        service.postAnswer(request, principal);
        return ResponseEntity.ok("Answer posted successfully");
    }


    @GetMapping("/answer/{id}")
    private ResponseEntity<Questions> getQuestionWithAnswers(@PathVariable("id") int id) {
        Questions question = service.getQuestionWithAnswers(id);
        return ResponseEntity.ok(question);
    }

    @PutMapping("/answer/{id}")
    private ResponseEntity<?> updateAnswer(@PathVariable("id") int id, Authentication authentication, @RequestBody Answer updatedAnswer){
        service.updateAnswer(id, authentication,updatedAnswer);
        return ResponseEntity.ok("Answer Updated Successfully");
    }

    @DeleteMapping("/answer/{id}")
    private ResponseEntity<?> deleteAnswer(@PathVariable("id") int id, Authentication authentication){
        service.deleteAnswer(id,authentication);
        return ResponseEntity.ok("Answer deleted successfully");
    }

    @PutMapping("/answer/{id}/vote")
    private ResponseEntity<?> voteAnswer(@PathVariable ("id") int id, @RequestParam int vote, @RequestParam int userId){
        try {
            service.voteAnswer(id, vote, userId);
            return ResponseEntity.ok("Vote recorded");
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
}
