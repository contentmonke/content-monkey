package com.content.monkey.backend.example.app.controller;

import com.content.monkey.backend.example.app.model.ExampleEntity;
import com.content.monkey.backend.example.app.service.ExampleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/examples")
public class ExampleController {
    @Autowired
    private ExampleService exampleService;

    @GetMapping
    public List<ExampleEntity> getAllExamples() {
        List<ExampleEntity> examples = exampleService.getAllExamples();
        //System.out.println("Fetched examples: " + examples.toString());
        return examples;
    }

    @PostMapping
    public ResponseEntity<ExampleEntity> createExampleEntity(@RequestBody ExampleEntity example) {
        ExampleEntity created = exampleService.createExampleEntity(example);
        return ResponseEntity.created(URI.create("/api/examples" + example.getId())).body(created);
    }
}