package com.anusha.stackoverflow.Models;

import java.util.List;

import com.anusha.stackoverflow.Models.enums.Role;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="users")
@JsonIgnoreProperties(ignoreUnknown = true)

public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organisation_id") 
    @JsonBackReference
    private Organisation organisation;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JsonBackReference(value = "user-questions")
    private List<Questions> questions;

    @OneToMany(mappedBy = "user",fetch = FetchType.LAZY)
    //@JsonManagedReference(value = "user")
    private List<Answer> answers;


}


