package com.content.monkey.backend.service;

import com.content.monkey.backend.example.app.model.ExampleEntity;
import com.content.monkey.backend.exceptions.UserNotFoundException;
import com.content.monkey.backend.model.ReviewEntity;
import com.content.monkey.backend.model.UserEntity;
import com.content.monkey.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.NoSuchElementException;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserEntity getUser(Long id) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException());
        return user;
    }

    public List<UserEntity> getAllExamples() {
        return userRepository.findAll();
    }

    public UserEntity createUserEntity (UserEntity created) {
        return userRepository.save(created);
    }

    public List<UserEntity> getSingleUser(String username) {
        return userRepository.findByName(username);
    }

    public void deleteUserById(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        } else {
            throw new NoSuchElementException("User not found");
        }
    }

    public UserEntity updateBiography(Long id, String biography) {
        UserEntity user = getUser(id);
        user.setBiography(biography);

        // Save the updated user
        return userRepository.save(user);
    }

    public UserEntity updateGenres(Long id, String genres) {
        UserEntity user = getUser(id);
        user.setGenres(genres);

        // Save the updated user
        return userRepository.save(user);
    }

    public String getGenres(Long id) {
        UserEntity user = getUser(id);
        return user.getGenres();
    }

    public UserEntity updateEmail(Long id, String email) {
        UserEntity user = getUser(id);
        if(user.getEmail() == null) {
            user.setEmail(email);
        }
        return userRepository.save(user);
    }

    public UserEntity addReviewIdToUser(Long id, Long reviewId) {
        UserEntity user = getUser(id);
        if (user.getReviewIds() == null) {
            user.setReviewIds(new ArrayList<>());
        }
        user.getReviewIds().add(reviewId);
        return userRepository.save(user);
    }


}
