package com.anusha.stackoverflow.Models;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionRequest {
    private int userId;
    private int organisationId;
    private String title;
    private String body;
    private List<String> tags;
    private String category;
}
