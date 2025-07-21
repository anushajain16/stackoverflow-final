package com.anusha.stackoverflow.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.anusha.stackoverflow.Models.enums.*;
import com.anusha.stackoverflow.Models.*;

@Repository
public interface UserRepository extends JpaRepository<Users,Integer>{
    Users findByEmail(String email);
    boolean existsByName(String name);
    boolean existsByEmail(String email);
    Users findById(int id);
    List<Users> findByOrganisationIdAndRole(int organisationId, Role role);
    Users getUserById(int id);
    
    @Query(
        value="select * from users u where u.organisation_id = :orgId and u.id != :userId",
        nativeQuery = true
    )
    List<Users> findByUsersAndOrganisation(@Param("userId") int userId, @Param("orgId") int organisationId);
        
    @Query(
        value ="SELECT * FROM users u WHERE ( LOWER(u.email) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(u.name) LIKE LOWER(CONCAT('%',:keyword,'%'))) AND u.organisation_id = :orgId",
        nativeQuery = true
    )
    List<Users> searchByKeywordAndOrg(@Param("keyword") String keyword, @Param("orgId") int organisationId);

    @Query(
        value = "Select u.name, u.email, count(a.id) as answer_count from answer a join users u on a.user_id = u.id where u.organisation_id=:orgId AND MONTH(a.created_at) = MONTH(CURDATE()) AND YEAR(a.created_at) = YEAR(CURDATE()) group by u.name, u.email order by answer_count desc LIMIT 5",
        nativeQuery = true
    )
    List<Object[]> findTopContributors(@Param("orgId") int orgId);

    @Query(
        value="select count(*) from users u where u.organisation_id = :orgId ",
        nativeQuery = true
    )
    Long countUsers(@Param("orgId") int orgId);
    
}
