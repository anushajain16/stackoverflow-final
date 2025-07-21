package com.anusha.stackoverflow.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anusha.stackoverflow.Models.QuestionTag;
import com.anusha.stackoverflow.Models.Questions;
import com.anusha.stackoverflow.Models.Tags;
import com.anusha.stackoverflow.Services.TagService;

@RestController
@RequestMapping("/stackoverflow")
public class TagsController {

    @Autowired
    private TagService service;
    
    @PostMapping("/tags")
    private ResponseEntity<?> addTag(@RequestBody Tags tag){
        service.addTag(tag);
        return ResponseEntity.ok("Tag added successfully");
    }

    @PostMapping("/tagSubmit")
    private ResponseEntity<?> addTagstoQuestionTags(@RequestBody List<QuestionTag> queTags ){
        service.addTagstoQuestionTags(queTags);
        return ResponseEntity.ok("Tags submitted successfully");
    }

    
    @GetMapping("/tags/{name}")
    private ResponseEntity<List<Questions>> getQuestionByTag(@PathVariable ("name") String name){
        List<Questions> list = service.getQuestionByTag(name);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/tags/name/{name}")
    public ResponseEntity<Tags> getTagByName(@PathVariable("name") String name) {
        Tags tag = service.findTagByName(name);
        if (tag == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(tag);
    }

    @GetMapping("/tags/create/{name}")
    public ResponseEntity<Tags> getOrCreateTagByName(@PathVariable("name") String name) {
        Tags tag = service.findOrCreateTagByName(name);
        return ResponseEntity.ok(tag);
    }


    

}
