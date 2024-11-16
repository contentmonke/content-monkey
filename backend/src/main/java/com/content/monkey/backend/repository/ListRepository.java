package com.content.monkey.backend.repository;

import com.content.monkey.backend.model.ListEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ListRepository extends JpaRepository<ListEntity, Long> {
    // Add custom queries here if needed
}