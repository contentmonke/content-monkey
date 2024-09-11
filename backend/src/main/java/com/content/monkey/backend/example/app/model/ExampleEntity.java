package com.content.monkey.backend.example.app.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
@Entity
public class ExampleEntity {
    // Setter for id
    // Getter for id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    // Setter for name
    // Getter for name
    private String name;

    // Default constructor
    public ExampleEntity() {
    }

    // Parameterized constructor (optional)
    public ExampleEntity(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "ExampleEntity{id=" + id + ", name='" + name + "'}";
    }
}
