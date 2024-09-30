package com.content.monkey.backend.controller;

import com.content.monkey.backend.example.app.model.ExampleEntity;
import com.content.monkey.backend.model.ReviewEntity;
import com.content.monkey.backend.model.UserEntity;
import com.content.monkey.backend.repository.UserRepository;
import com.content.monkey.backend.service.UserService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.NoSuchElementException;
import org.springframework.http.HttpStatus;


import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @PostMapping("/")
    public List<UserEntity> getUser(@RequestBody UserEntity user) {
        System.out.println("HERE");
        System.out.println(user);
        List<UserEntity> users = userService.getSingleUser(user.getName());
        if (users.isEmpty()) {
            users.add(createExampleEntity(user));
        }
        System.out.println(users);
        return users;
    }
    @GetMapping("/all")
    public List<UserEntity> getAllExamples() {
        List<UserEntity> examples = userService.getAllExamples();
        System.out.println("Fetched examples: " + examples.toString());
        return examples;
    }


    public UserEntity createExampleEntity(@RequestBody UserEntity example) {
        UserEntity created = userService.createUserEntity(example);
        return created;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUserById(id);
            return ResponseEntity.ok("User deleted successfully");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    @PutMapping("/{id}/biography")
    public UserEntity updateBiography(@PathVariable Long id, @RequestBody String biography) {
        return userService.updateBiography(id, biography);
    }

    @PostMapping("/name/{name}")
    public List<UserEntity> getUserbyName(@PathVariable String name) {
        List<UserEntity> users = userService.getSingleUser(name);
        if (users.isEmpty()) {
            return null;
        }
        return users;
    }

}
