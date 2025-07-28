package com.anusha.stackoverflow.Services;

import java.time.LocalDateTime;

import com.anusha.stackoverflow.Models.enums.Cat;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.*;
import org.springframework.security.core.Authentication;
import com.anusha.stackoverflow.Models.Organisation;
import com.anusha.stackoverflow.Models.QuestionRequest;
import com.anusha.stackoverflow.Models.QuestionTag;
import com.anusha.stackoverflow.Models.QuestionVote;
import com.anusha.stackoverflow.Models.Questions;
import com.anusha.stackoverflow.Models.Tags;
import com.anusha.stackoverflow.Models.Users;
import com.anusha.stackoverflow.Repository.AnswerRepository;
import com.anusha.stackoverflow.Repository.AnswerVoteRepository;
import com.anusha.stackoverflow.Repository.OrganisationRepository;
import com.anusha.stackoverflow.Repository.QueTagsRepository;
import com.anusha.stackoverflow.Repository.QuestionVoteRepository;
import com.anusha.stackoverflow.Repository.QuestionsRepository;
import com.anusha.stackoverflow.Repository.TagsRepository;
import com.anusha.stackoverflow.Repository.UserRepository;

import jakarta.transaction.Transactional;


@Service
public class QuestionService {

    @Autowired
    private QuestionsRepository queRepo;

    @Autowired
    private UserRepository repo;

    @Autowired 
    private OrganisationRepository orgRepo;

    @Autowired 
    private UserRepository userRepo;

    @Autowired
    private QuestionVoteRepository queVoteRepo;

    @Autowired 
    private TagsRepository tagRepo;

    @Autowired
    private QueTagsRepository queTagRepo;

    @Autowired
    private AnswerRepository ansRepo;

    @Autowired
    private AnswerVoteRepository ansVoteRepo;


    public void addQuestion(Questions questions){ //Post a question 

        int userId = questions.getUser().getId();
        int orgId = questions.getOrganisation().getId();

        questions.setBody(questions.getBody());
        questions.setTitle(questions.getTitle());
        questions.setCreatedAt(LocalDateTime.now());
        questions.setUpdatedAt(LocalDateTime.now());
        questions.setDownvotes(0);
        questions.setUpvotes(0);
        questions.setViews(0);
        
        
        Users user = repo.findById(userId).orElseThrow(() -> new RuntimeException("User not found with ID"));
        Organisation organisation = orgRepo.findById(orgId).orElseThrow(() -> new RuntimeException("Organisation not found with ID"));

        questions.setUser(user);
        questions.setOrganisation(organisation);
        questions.setIsDeleted(false);
        
        String categoryStr = questions.getCat().name();
        questions.setCat(Cat.valueOf(categoryStr.toUpperCase()));

        queRepo.save(questions);
    }

    public List<Questions> getQuestions(int id){ //Getting questions according organisation

        List<Questions> questions = queRepo.findByOrganisationId(id);
        for (Questions q : questions) {
        q.getUser().getName(); // force loading user

    }
        return questions;
    }

    public List<Questions> getCategory(String cat){  //Category wise questions 
        try {
            Cat category = Cat.valueOf(cat.toUpperCase());  
            return queRepo.findByCat(category);             
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid category: " + cat);
        }
    }

    
    public List<Questions> getCategoryByOrg(Cat cat, int organisationId) {
        return queRepo.findByCatAndOrganisationId(cat, organisationId);
    }
    

    public List<Questions> myQuestions(int id){
        List<Questions> questions = queRepo.findByUserId(id);
        return questions;
    }

    public void updateQuestion(int id, Questions updatedQuestion, Authentication authentication){
        Questions question = queRepo.findById(id).orElseThrow(()->new RuntimeException("Question not found"));

        String loggedInUserEmail = authentication.getName();

        if (!question.getUser().getEmail().equals(loggedInUserEmail)) {
            throw new RuntimeException("Unauthorized to update this question");
        }

        question.setTitle(updatedQuestion.getTitle());
        question.setBody(updatedQuestion.getBody());
        question.setUpdatedAt(LocalDateTime.now());

        queRepo.save(question);
    }

    @Transactional
    public void deleteQuestion(int id, Authentication authentication){
        String email = authentication.getName();
        Questions question = queRepo.findById(id).orElseThrow(()->new RuntimeException("Question not found"));
        
        if (!question.getUser().getEmail().equals(email)) {
            throw new RuntimeException("You are not authorized to delete this question.");
        }
        queVoteRepo.deleteByQuestionId(id);
        queTagRepo.deleteByQuestionId(id);
        ansVoteRepo.deleteByAnswerQuestionId(id);
        ansRepo.deleteByQuestionId(id);
        queRepo.deleteById(id);
    }

    public void voteQuestion(int id, int vote, int userId){
        Questions questions = queRepo.findById(id).orElseThrow(()->new RuntimeException("Question not found"));
        Users user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found with ID"));

        QuestionVote existing = queVoteRepo.findByQuestionAndUser(questions, user);
        if(existing!=null){
            throw new IllegalStateException("User already voted");
        }

        if(vote==1){
            questions.setUpvotes(questions.getUpvotes()+1);
        }
        else if(vote==-1){
            questions.setDownvotes(questions.getDownvotes()+1);
        }

        queRepo.save(questions);

        // Save vote record
        QuestionVote qv = new QuestionVote();
        qv.setQuestion(questions);
        qv.setUser(user);
        qv.setVote(vote);
        queVoteRepo.save(qv);

    }

    @Transactional
    public Questions submitQuestionWithTags(QuestionRequest request) {
        Questions question = new Questions();
        question.setTitle(request.getTitle());
        question.setBody(request.getBody());

        
        try {
            Cat categoryEnum = Cat.valueOf(request.getCategory().toUpperCase());
            question.setCat(categoryEnum);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid category: " + request.getCategory());
        }

        
        Users user = userRepo.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + request.getUserId()));
        question.setUser(user);

        
        Organisation org = orgRepo.findById(request.getOrganisationId())
                .orElseThrow(() -> new RuntimeException("Organisation not found with ID: " + request.getOrganisationId()));
        question.setOrganisation(org);

        // Handle tags
        List<QuestionTag> questionTags = new ArrayList<>();
        for (String tagName : request.getTags()) {
            String cleanTagName = tagName.trim().toLowerCase();

            Tags tag = tagRepo.findByName(cleanTagName);
            if (tag == null) {
                tag = new Tags();
                tag.setName(cleanTagName);
                tagRepo.save(tag);
            }

            QuestionTag qt = new QuestionTag();
            qt.setTag(tag);
            qt.setQuestion(question);
            questionTags.add(qt);
        }

        question.setQuestionTags(questionTags);

        return queRepo.save(question);
    }


    public List<Questions> searchQuestions(String keyword, int organisationId) {
        return queRepo.searchByKeywordAndOrg(keyword, organisationId);
    }


}
