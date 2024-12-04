package com.content.monkey.backend.repository;

import com.content.monkey.backend.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    public List<UserEntity> findByName(String name);
    public List<UserEntity> findByEmail(String email);
    boolean existsByUsername(String username);

    @Query("SELECT u FROM UserEntity u WHERE u.username LIKE %:searchTerm% ORDER BY LENGTH(u.username) ASC, u.username ASC")
    List<UserEntity> findClosestMatchByUsername(@Param("searchTerm") String searchTerm);

    @Query("SELECT u FROM UserEntity u ORDER BY ABS(u.id - :searchId)")
    List<UserEntity> findClosestMatchById(@Param("searchId") Long searchId);
}
