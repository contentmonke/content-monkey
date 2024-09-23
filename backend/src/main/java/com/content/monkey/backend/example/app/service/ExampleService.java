package com.content.monkey.backend.example.app.service;

import com.content.monkey.backend.example.app.model.ExampleEntity;
import com.content.monkey.backend.example.app.repository.ExampleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ExampleService {
    @Autowired
    private ExampleRepository exampleRepository;

    public List<ExampleEntity> getAllExamples() {

        return exampleRepository.findAll();
    }

}
