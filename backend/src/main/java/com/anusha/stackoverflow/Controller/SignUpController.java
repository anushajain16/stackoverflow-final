package com.anusha.stackoverflow.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anusha.stackoverflow.Models.Organisation;
import com.anusha.stackoverflow.Models.Users;
import com.anusha.stackoverflow.Repository.OrganisationRepository;
import com.anusha.stackoverflow.Services.UserServices;

@RestController
@RequestMapping("/stackoverflow")
@CrossOrigin(origins = "http://localhost:3000") 
public class SignUpController {

    @Autowired
    private UserServices service;

    @Autowired
    private OrganisationRepository orgRepo;
    
    @PostMapping("/signup/user")
    public ResponseEntity<String> registerUser(@RequestBody Users user) {
        try {
            service.registerUser(user);
            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("User registration failed: " + e.getMessage());
        }
    }

    @PostMapping("/signup/admin")
    public ResponseEntity<Organisation> registerAdmin(@RequestBody Organisation org) {
        if (orgRepo.existsByName(org.getName())) {
            return ResponseEntity.badRequest().body(null);
        }
        Organisation savedOrg = orgRepo.save(org);
        return ResponseEntity.ok(savedOrg);  
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Users user) {
        return service.verify(user);
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Backend is working!");
    }


}
