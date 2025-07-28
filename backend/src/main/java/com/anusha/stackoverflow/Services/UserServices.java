package com.anusha.stackoverflow.Services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.anusha.stackoverflow.Models.Organisation;
import com.anusha.stackoverflow.Models.Users;
import com.anusha.stackoverflow.Repository.OrganisationRepository;
import com.anusha.stackoverflow.Repository.UserRepository;
import com.anusha.stackoverflow.Models.enums.*;

@Service
public class UserServices {
    
    @Autowired
    private UserRepository repo;

    @Autowired
    AuthenticationManager manager;

    @Autowired
    private JWTService jwtService;

    @Autowired 
    private OrganisationRepository orgRepo;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    @Transactional
    public void registerUser(Users user){ // Registering a new user 

        if (user.getOrganisation() == null) {
            throw new IllegalArgumentException("Organisation must not be null");
        }
        
        int orgId = user.getOrganisation().getId();
        String userEmail = user.getEmail();

        Organisation organisation = orgRepo.findById(orgId).orElseThrow(() -> new RuntimeException("Organisation not found with ID: "));;

        if (repo.existsByEmail(userEmail)) {
            throw new IllegalArgumentException("Email already exists");
        }

        // Check if admin already exists in the organisation
        if (user.getRole() == Role.ADMIN) {
            List<Users> existingAdmins = repo.findByOrganisationIdAndRole(orgId, Role.ADMIN);
            if (!existingAdmins.isEmpty()) {
                throw new IllegalArgumentException("Only one admin allowed per organisation");
            }
        }
        
        user.setOrganisation(organisation);
        user.setPassword(encoder.encode(user.getPassword()));
        repo.save(user);
    }

    @Transactional
    public void registerAdmin(Organisation org){ // Registering a new organisation
        String orgName = org.getName();
        
        if (orgRepo.existsByName(orgName)) {
            throw new IllegalArgumentException("Organisation name already exists!"); //Does not allow to enter a registered organisation
        }

        orgRepo.save(org); 
    }

    public Map<String, String> verify(Users user) {
    Authentication authentication = manager.authenticate(
        new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
    );

    if (authentication.isAuthenticated()) {
        String token = jwtService.generateToken(user.getEmail());
        Users existingUser = repo.findByEmail(user.getEmail());

        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("role", existingUser.getRole().name());
        response.put("orgId", String.valueOf(existingUser.getOrganisation().getId()));
        response.put("userId",String.valueOf(existingUser.getId()));
        response.put("name",existingUser.getName());
        return response;
    }

    throw new RuntimeException("Authentication failed");
    }
}
