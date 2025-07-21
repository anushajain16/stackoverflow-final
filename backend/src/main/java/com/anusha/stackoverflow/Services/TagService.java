package com.anusha.stackoverflow.Services;


import com.anusha.stackoverflow.Models.QuestionTag;
import com.anusha.stackoverflow.Models.Questions;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.anusha.stackoverflow.Models.Tags;
import com.anusha.stackoverflow.Repository.QueTagsRepository;
import com.anusha.stackoverflow.Repository.QuestionsRepository;
import com.anusha.stackoverflow.Repository.TagsRepository;

@Service
public class TagService {
    
    @Autowired
    private TagsRepository tagRepo;

    @Autowired
    private QuestionsRepository queRepo;

    @Autowired
    private QueTagsRepository qTagRepo;

    public void addTag(Tags tag){
        tag.setName(tag.getName());
        tagRepo.save(tag);
    }

    public void addTagstoQuestionTags(List<QuestionTag> queTags){

            for (QuestionTag qTag : queTags) {
            int questionId = qTag.getQuestion().getId();
            int tagId = qTag.getTag().getId();

            Questions q = queRepo.findById(questionId).orElseThrow(()->new RuntimeException("Question not found"));
            Tags t = tagRepo.findById(tagId).orElseThrow(()->new RuntimeException("Tag not found"));
            
            if (t == null) {
                throw new RuntimeException("Tag not found");
            }

            QuestionTag newQTag = new QuestionTag();
            newQTag.setQuestion(q);
            newQTag.setTag(t);
            qTagRepo.save(newQTag);
        }
    }

     
    public List<Questions> getQuestionByTag(String name){
        Tags tag = tagRepo.findByName(name);
        if (tag == null) {
            throw new RuntimeException("Tag not found");
        }

        List<QuestionTag> questionTags = qTagRepo.findAllByTag(tag);

        List<Questions> questions = new ArrayList<>();
        for (QuestionTag qt : questionTags) {
            questions.add(qt.getQuestion());
        }

        return questions;
    }

    public Tags findTagByName(String name) {
        return tagRepo.findByName(name);
    }

    public Tags findOrCreateTagByName(String name) {
        Tags tag = tagRepo.findByName(name);
        if (tag == null) {
            tag = new Tags();
            tag.setName(name);
            tag=tagRepo.save(tag);
        }
        return tag;
    }


}
