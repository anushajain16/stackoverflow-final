package com.anusha.stackoverflow.Services;

import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.anusha.stackoverflow.Models.Answer;
import com.anusha.stackoverflow.Models.AnswerVote;
import com.anusha.stackoverflow.Models.Questions;
import com.anusha.stackoverflow.Models.Users;
import com.anusha.stackoverflow.Repository.AnswerRepository;
import com.anusha.stackoverflow.Repository.AnswerVoteRepository;
import com.anusha.stackoverflow.Repository.QuestionsRepository;
import com.anusha.stackoverflow.Repository.UserRepository;

@Service
public class AnswerService {
    
    @Autowired
    private UserRepository userRepo;

    @Autowired 
    private QuestionsRepository queRepo;

    @Autowired
    private AnswerRepository ansRepo;

    @Autowired 
    private AnswerVoteRepository ansVoteRepo;

    public void postAnswer(Answer answer) {
        answer.setDeleted(false);
        answer.setCreatedAt(LocalDateTime.now());
        answer.setUpdatedAt(LocalDateTime.now());

        int userId = answer.getUser().getId();
        int questionId = answer.getQuestions().getId();

        
        Users user = userRepo.findById(userId);
        Questions question = queRepo.findById(questionId).orElseThrow(()->new RuntimeException("Question not found"));
        System.out.println("Saving answer with body: " + answer.getBody());

        System.out.println("Received body: " + answer.getBody());

        answer.setUser(user);
        answer.setQuestions(question);
        answer.setDownvotes(0);
        answer.setUpvotes(0);
        ansRepo.save(answer);
    }

    public Questions getQuestionWithAnswers(int id) {
        return queRepo.findById(id).orElseThrow(()->new RuntimeException("Question not found"));
    }

    public void updateAnswer(int id, Authentication authentication, Answer updatedAnswer){
        Answer answer = ansRepo.findById(id);
        String loggedInUserEmail = authentication.getName();

        if(!answer.getUser().getEmail().equals(loggedInUserEmail)){
            throw new RuntimeException("Unauthorized access to update answer");
        }
        answer.setBody(updatedAnswer.getBody());
        answer.setUpdatedAt(updatedAnswer.getUpdatedAt());
        ansRepo.save(answer);
    }

    public void deleteAnswer(int id, Authentication authentication){
        Answer answer = ansRepo.findById(id);
        String loggedInUserEmail = authentication.getName();

        if(!answer.getUser().getEmail().equals(loggedInUserEmail)){
            throw new RuntimeException("Not allowed to delete answer");
        }
        ansVoteRepo.deleteByAnswerId(id);
        ansRepo.delete(answer);
    }

    public void voteAnswer(int id, int vote, int userId){
        Answer ans = ansRepo.findById(id);
        Users user = userRepo.findById(userId);

        AnswerVote existing = ansVoteRepo.findByAnswerAndUser(ans, user);
        if(existing!=null){
            throw new IllegalStateException("User has already voted the answer");
        }

        if(vote==1){
            ans.setUpvotes(ans.getUpvotes()+1);
        }
        else if(vote==-1){
            ans.setDownvotes(ans.getDownvotes()+1);
        }

        ansRepo.save(ans);

        // Save vote record
        AnswerVote av = new AnswerVote();
        av.setAnswer(ans);
        av.setUser(user);
        av.setVote(vote);
        ansVoteRepo.save(av);
    }

}
