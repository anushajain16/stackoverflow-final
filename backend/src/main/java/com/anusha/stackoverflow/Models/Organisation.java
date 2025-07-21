package com.anusha.stackoverflow.Models;


import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

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
@Table(name="organisation")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Organisation {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, unique = true)
    private String name;

    @OneToMany(mappedBy = "organisation")
    @JsonManagedReference
    private List<Users> users;

    @OneToMany(mappedBy = "organisation", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "org-questions")
    private List<Questions> questions;

}
