package com.anusha.stackoverflow.Services;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.anusha.stackoverflow.Repository.AnswerRepository;
import com.anusha.stackoverflow.Repository.QuestionsRepository;
import com.anusha.stackoverflow.Repository.UserRepository;

@Service
public class UserStatsService {
    
    @Autowired
    private QuestionsRepository queRepo;

    @Autowired
    private AnswerRepository ansRepo;

    @Autowired
    private UserRepository userRepo;

    public Long getUserQuestionCount(int userId) {
        return queRepo.countQuestionsByUser(userId);
    }

    public Long getUserAnswerCount(int userId){
        return ansRepo.countAnswersByUser(userId);
    }

    public Long getTotalUpvotes(int userId){
        return ansRepo.sumUpvotes(userId);
    }

    public Long getTotalDownVotes(int userId){
        return ansRepo.sumDownVotes(userId);
    }

    public Long getUnansweredQuestions(int userId){
        return queRepo.countUnansweredQuestionsByUser(userId);
    }

    public List<Object[]> getMonthlyActivity(int userId) {
        return queRepo.findMonthlyActivity(userId);
    }

    public Long getTotalViews(int userId){
        return queRepo.totalViews(userId);
    }


    public Map<String, Object> getStats(int userId) {
        Map<String, Object> stats = new HashMap<>();
        String name = userRepo.getUserById(userId).getName();
        int organisation_id = userRepo.getUserById(userId).getOrganisation().getId();
        
        stats.put("name", name);
        stats.put("organisation_id", organisation_id);
        stats.put("questionCount", getUserQuestionCount(userId));
        stats.put("answerCount", getUserAnswerCount(userId));
        stats.put("totalUpvotes", getTotalUpvotes(userId));
        stats.put("totalDownvotes", getTotalDownVotes(userId));
        stats.put("unansweredQuestions", getUnansweredQuestions(userId));
        stats.put("totalViews", getTotalViews(userId));

        // Monthly activity: [year, month, count]
        List<Object[]> monthlyActivity = queRepo.findMonthlyActivity(userId);
        List<Map<String, Object>> monthlyList = new ArrayList<>();
        for (Object[] row : monthlyActivity) {
            Map<String, Object> entry = new HashMap<>();
            entry.put("year", row[0]);
            entry.put("month", row[1]);
            entry.put("count", row[2]);
            monthlyList.add(entry);
        }
        stats.put("monthlyActivity", monthlyList);

        // Category-wise distribution: [category, count]
        List<Object[]> categoryDist = queRepo.countQuestionsByCategory(userId);
        List<Map<String, Object>> categoryList = new ArrayList<>();
        for (Object[] row : categoryDist) {
            Map<String, Object> entry = new HashMap<>();
            entry.put("category", row[0]);
            entry.put("count", row[1]);
            categoryList.add(entry);
        }
        stats.put("categoryDistribution", categoryList);

        return stats;
    }


}
