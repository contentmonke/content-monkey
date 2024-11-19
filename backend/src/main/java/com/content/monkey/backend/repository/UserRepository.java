package com.content.monkey.backend.repository;

import com.content.monkey.backend.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    public List<UserEntity> findByName(String username);
    public List<UserEntity> findByEmail(String email);
    @Query("SELECT e FROM UserEntity e WHERE LOWER(e.name) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<UserEntity> getUserLikeName(@Param("searchTerm") String searchTerm);
    @Query("SELECT e FROM UserEntity e WHERE LOWER(e.email) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<UserEntity> getUserLikeEmail(@Param("searchTerm") String searchTerm);
}
