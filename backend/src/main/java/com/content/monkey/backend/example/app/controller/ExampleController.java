package com.content.monkey.backend.example.app.controller;

import com.content.monkey.backend.example.app.model.ExampleEntity;
import com.content.monkey.backend.example.app.service.ExampleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/examples")
public class ExampleController {
    @Autowired
    private ExampleService exampleService;

    @GetMapping
    public List<ExampleEntity> getAllExamples() {
        List<ExampleEntity> examples = exampleService.getAllExamples();
        System.out.println("Fetched examples: " + examples.toString());
        return examples;
    }
}