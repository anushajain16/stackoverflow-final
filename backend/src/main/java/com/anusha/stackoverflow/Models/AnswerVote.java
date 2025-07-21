package com.anusha.stackoverflow.Models;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "answer_votes", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"answer_id", "user_id"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AnswerVote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "answer_id")
    private Answer answer;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

    private int vote;  // +1 for upvote, -1 for downvote
}

