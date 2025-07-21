package com.anusha.stackoverflow.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.anusha.stackoverflow.Models.Questions;
import com.anusha.stackoverflow.Models.Users;
import com.anusha.stackoverflow.Services.AdminService;

@RestController
@RequestMapping("/stackoverflow/admin")
public class AdminController {

    @Autowired
    private AdminService service;
    
    
    @GetMapping("/user")
    public ResponseEntity<List<Users>> getUsers(@RequestParam int organisationId, @RequestParam int userId){
        List<Users> list = service.getUsers(organisationId,userId);
        return ResponseEntity.ok(list);
    } 
        
    @GetMapping("/user/search")
    public ResponseEntity<List<Users>> searchQuestions(@RequestParam String query,@RequestParam int organisationId) {
        List<Users> users = service.searchUsers(query, organisationId);
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/questions/{id}")
    public ResponseEntity<?> deleteQuestionAsAdmin(@PathVariable int id) {
        service.deleteQuestionAsAdmin(id);
        return ResponseEntity.ok("Question deleted successfully");
    }

    @GetMapping("/{orgId}/stats")
    public ResponseEntity< Map<String, Object>> getOrgStats(@PathVariable("orgId") int id){
        Map<String, Object> list= service.getOrgStats(id);
        return ResponseEntity.ok(list);
    }

}
