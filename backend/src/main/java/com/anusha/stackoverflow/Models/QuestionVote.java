package com.anusha.stackoverflow.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "question_votes", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"question_id", "user_id"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuestionVote {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "question_id")
    @JsonBackReference(value = "question-votes")
    private Questions question;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

    // +1 for upvote, -1 for downvote
    private int vote;

    


}
