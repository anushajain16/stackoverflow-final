package com.anusha.stackoverflow.Models;

import java.time.LocalDateTime;
import java.util.List;

import com.anusha.stackoverflow.Models.enums.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

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
@Table(name="questions")

public class Questions {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String body;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="users_id")
    @JsonIgnoreProperties({"questions", "answers", "organisation", "password"})
    private Users user;

    @ManyToOne
    @JoinColumn(name="organisation_id")
    @JsonBackReference(value = "org-questions")
    private Organisation organisation;

    @Column
    private Boolean isDeleted;

    @Enumerated(EnumType.STRING)
    private Cat cat;
    
    @OneToMany(mappedBy = "questions")
    //@JsonManagedReference(value = "question")
    @JsonIgnoreProperties("questions")
    private List<Answer> answers;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value="que-tag")
    private List<QuestionTag> questionTags;


    //
    @Column(nullable = false)
    private int views = 0;

    @Column(nullable = false)
    private int upvotes = 0;

    @Column(nullable = false)
    private int downvotes = 0;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<QuestionVote> votes;



}



