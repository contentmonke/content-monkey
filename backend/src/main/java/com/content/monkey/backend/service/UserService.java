package com.content.monkey.backend.service;

import com.content.monkey.backend.example.app.model.ExampleEntity;
import com.content.monkey.backend.exceptions.UserNotFoundException;
import com.content.monkey.backend.model.ReviewEntity;
import com.content.monkey.backend.model.UserEntity;
import com.content.monkey.backend.repository.UserRepository;
import org.apache.catalina.User;
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

    public UserEntity updatePicture(Long id, String picture) {
        UserEntity user = getUser(id);
        if(user.getPicture() == null) {
            user.setPicture(picture);
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

    public List<String> getFriendRequests(Long id) {
        UserEntity user = getUser(id);
        return user.getFriend_requests();
    }

    public UserEntity sendFriendRequest(Long from, Long to) {
        UserEntity user = getUser(to);
        if (user.getFriend_requests() == null) {
            user.setFriend_requests(new ArrayList<String>());
        }
        System.out.println(user.getFriend_list());
        if (!user.getFriend_requests().contains(String.valueOf(from))) {
            user.getFriend_requests().add((String.valueOf(from)));
        }
        return userRepository.save(user);
    }
    public UserEntity acceptRequest(Long from, Long to, boolean decision) {
        UserEntity user = getUser(to);
        if (user.getFriend_list() == null) {
            user.getFriend_requests().remove(String.valueOf(from));
        }
        if (decision) {
            UserEntity requester = getUser(from);
            if (user.getFriend_list() == null) {
                user.setFriend_list(new ArrayList<>());
            }
            if (requester.getFriend_list() == null) {
                requester.setFriend_list(new ArrayList<>());
            }
            user.getFriend_list().add(String.valueOf(from));
            requester.getFriend_list().add(String.valueOf(to));
            userRepository.save(user);
            userRepository.save(requester);
        }

        return user;
    }

    public List<String> getFriendList(Long id) {
        UserEntity user = getUser(id);
        List<String> usernames = new ArrayList<>();
        for (int i = 0; i < user.getFriend_list().size(); i++) {
            UserEntity getUserById = getUser(Long.valueOf(user.getFriend_list().get(i)));
            usernames.add(getUserById.getName());
        }
        return usernames;
    }
}
