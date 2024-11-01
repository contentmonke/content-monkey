package com.content.monkey.backend.repository;

import com.content.monkey.backend.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    public List<UserEntity> findByName(String username);
    public List<UserEntity> findByEmail(String email);
}
