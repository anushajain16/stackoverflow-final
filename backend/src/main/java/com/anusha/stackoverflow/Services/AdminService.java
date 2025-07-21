package com.anusha.stackoverflow.Services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.anusha.stackoverflow.Models.Questions;
import com.anusha.stackoverflow.Models.Users;
import com.anusha.stackoverflow.Repository.AnswerRepository;
import com.anusha.stackoverflow.Repository.AnswerVoteRepository;
import com.anusha.stackoverflow.Repository.QueTagsRepository;
import com.anusha.stackoverflow.Repository.QuestionVoteRepository;
import com.anusha.stackoverflow.Repository.QuestionsRepository;
import com.anusha.stackoverflow.Repository.UserRepository;

@Service
public class AdminService {
    
    @Autowired
    private UserRepository userRepo;

    @Autowired
    private QuestionsRepository queRepo;

    @Autowired
    private QuestionVoteRepository queVoteRepo;

    @Autowired
    private AnswerRepository ansRepo;

    @Autowired
    private AnswerVoteRepository ansVoteRepo;

    @Autowired
    private QueTagsRepository queTagRepo;
    
    public List<Users> getUsers(int organisationId, int userId){
        List<Users> list = userRepo.findByUsersAndOrganisation(userId,organisationId);
        return list;
    }

    public List<Users> searchUsers(String keyword, int organisationId){
        List<Users> list = userRepo.searchByKeywordAndOrg(keyword.toLowerCase(), organisationId);
        return list;
    }

    public void deleteQuestionAsAdmin(int id) {
        Questions question = queRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Question not found"));

        queVoteRepo.deleteByQuestionId(id);
        queTagRepo.deleteByQuestionId(id);
        ansVoteRepo.deleteByAnswerQuestionId(id);
        ansRepo.deleteByQuestionId(id);

        queRepo.deleteById(id);
    }

    public Long getOrgQuestionCount(int orgId){
        return queRepo.countQuestionsByOrg(orgId);
    }

    public Long getOrgAnswerCount(int orgId){
        return ansRepo.countAnswersByOrg(orgId);
    }

    public Long getTotalUpvotes(int orgId){
        return queRepo.countUpvotes(orgId);
    }

    public Long getTotalDownvotes(int orgId){
        return queRepo.countDownvotes(orgId);
    }

    public Long getTotalViews(int orgId){
        return queRepo.countViews(orgId);
    }

    public Long getTotalUsers(int orgId){
        return userRepo.countUsers(orgId);
    }

    public Long getTotalTags(int orgId){
        return queTagRepo.countByOrgId(orgId);
    }

    public Long getUnansweredQuestions(int orgId){
        return queRepo.countUnansweredQuestionsByOrg(orgId);
    }

    public Map<String, Object> getOrgStats(int orgId) {
        Map<String, Object> stats = new HashMap<>();
        
        stats.put("questionCount", getOrgQuestionCount(orgId));
        stats.put("answerCount", getOrgAnswerCount(orgId));
        stats.put("totalVotes", getTotalUpvotes(orgId)+getTotalDownvotes(orgId));
        stats.put("unansweredQuestions", getUnansweredQuestions(orgId));
        stats.put("totalUsers", getTotalUsers(orgId));
        stats.put("totalTags",getTotalTags(orgId));

        // Monthly activity: [year, month, count]
        List<Object[]> monthlyActivity = queRepo.findMonthlyActivityByOrg(orgId);
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
        List<Object[]> categoryDist = queRepo.countQuestionsByCategoryAndOrg(orgId);
        List<Map<String, Object>> categoryList = new ArrayList<>();
        for (Object[] row : categoryDist) {
            Map<String, Object> entry = new HashMap<>();
            entry.put("category", row[0]);
            entry.put("count", row[1]);
            categoryList.add(entry);
        }
        stats.put("categoryDistribution", categoryList);

        
        List<Object[]> topContributors = userRepo.findTopContributors(orgId);
        List<Map<String, Object>> topContributorsList = new ArrayList<>();
        for (Object[] row : topContributors) {
            Map<String, Object> entry = new HashMap<>();
            entry.put("name", row[0]);
            entry.put("email", row[1]);
            entry.put("count",row[2]);
            topContributorsList.add(entry);
        }
        stats.put("top5Contributors", topContributorsList);

        
        List<Object[]> topQuestions = queRepo.findTopQuestions(orgId);
        List<Map<String, Object>> topQuestionsList = new ArrayList<>();
        for (Object[] row : topQuestions) {
            Map<String, Object> entry = new HashMap<>();
            entry.put("title", row[0]);
            entry.put("upvotes", row[1]);
            entry.put("name",row[2]);
            topQuestionsList.add(entry);
        }
        stats.put("top5Questions", topQuestionsList); 

        return stats;
    }
}
