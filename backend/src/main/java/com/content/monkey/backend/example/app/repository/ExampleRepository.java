package com.content.monkey.backend.example.app.repository;

import com.content.monkey.backend.example.app.model.ExampleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExampleRepository extends JpaRepository<ExampleEntity, Long> {
}
