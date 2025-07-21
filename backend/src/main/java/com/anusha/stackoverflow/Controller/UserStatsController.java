package com.anusha.stackoverflow.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anusha.stackoverflow.Services.UserStatsService;

@RestController
@RequestMapping("/stackoverflow")
public class UserStatsController {

    @Autowired
    private UserStatsService service;
    
    @GetMapping("/{userId}/stats")
    public ResponseEntity< Map<String, Object>> getStats(@PathVariable("userId") int id){
        Map<String, Object> list= service.getStats(id);
        return ResponseEntity.ok(list);
    }
}
