package com.content.monkey.backend.controller;

import com.content.monkey.backend.model.ListEntity;
import com.content.monkey.backend.chatgpt.ChatGPTRequest;
import com.content.monkey.backend.chatgpt.ChatGPTResponse;
import com.content.monkey.backend.model.MediaEntity;
import com.content.monkey.backend.model.ReviewEntity;
import com.content.monkey.backend.model.UserEntity;
import com.content.monkey.backend.repository.UserRepository;
import com.content.monkey.backend.service.UserService;
import com.content.monkey.backend.service.Auth0Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.NoSuchElementException;
import org.springframework.http.HttpStatus;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.ArrayList;

import java.util.*;

import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private Auth0Service auth0Service;
    @PostMapping("/")
    public List<UserEntity> getUser(@RequestBody UserEntity user) {
        List<UserEntity> users = userService.getSingleUser(user.getName());

        if (users.isEmpty()) {
            // Save the new user directly with createUserEntity
            UserEntity newUser = userService.createUserEntity(user);
            users.add(newUser);
        }

        return users;
    }

    @PostMapping("/setPicture")
    public void setPicture(@RequestParam("id") Long id, @RequestParam("picture") String picture) {
        userService.updatePicture(id, picture);
    }

    @PostMapping("/updatePicture")
    public void updatePicture(@RequestBody Map<String, Object> requestBody) {
        Long id = Long.valueOf(requestBody.get("id").toString());
        String picture = (String) requestBody.get("picture");
        userService.setPicture(id, picture);
    }

    @GetMapping("/getPicture")
    public String getPicture(@RequestParam("id") Long id) {
        return userService.getPicture(id);
    }

    @GetMapping("/getFavorites")
    public List<String> getFavorites(@RequestParam("id") Long id)  {
        return userService.getFavorites(id);
    }

    @PostMapping("/setfavoritemedia")
    public void setFavoriteMedia(@RequestBody Map<String, Object> request) {
        Long id = ((Number) request.get("id")).longValue();
        List<String> favorites = (List<String>) request.get("favorites");
        userService.setFavorites(id, favorites);
    }

    @GetMapping("/all")
    public List<UserEntity> getAllExamples() {
        List<UserEntity> examples = userService.getAllExamples();
        //System.out.println("Fetched examples: " + examples.toString());
        return examples;
    }

    @DeleteMapping("/{id}/{authID}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id, @PathVariable String authID) {
        try {
            userService.deleteUserById(id);
            auth0Service.deleteUser(authID);
            return ResponseEntity.ok("User deleted successfully");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    @PutMapping("/{id}/biography")
    public UserEntity updateBiography(@PathVariable Long id, @RequestBody String biography) {
        return userService.updateBiography(id, biography);
    }

    @GetMapping("/email")
    public UserEntity getUserByEmail(@RequestParam("email") String email) {
        return userService.getUserByEmail(email);
    }

    @GetMapping("/username-search")
    public List<UserEntity> getUserByUsernameSearch(@RequestParam("username") String username) {
        return userService.getUserByUsernameSearch(username);
    }

    @GetMapping("/id-search")
    public List<UserEntity> getUserByIdSearch(@RequestParam("id") Long id) {
        return userService.getUserByIdSearch(id);
    }

    @PostMapping("/name/{name}")
    public List<UserEntity> getUserbyName(@PathVariable String name) {
        List<UserEntity> users = userService.getSingleUser(name);
        if (users.isEmpty()) {
            return null;
        }
        return users;
    }

    @GetMapping("/{id}")
    public UserEntity getUserById(@PathVariable Long id) {
        return userService.getUser(id);
    }

    @PutMapping("genres/{id}")
    public UserEntity updateGenres(@PathVariable Long id, @RequestBody String genres) {
        return userService.updateGenres(id, genres);
    }

    @PutMapping("email/{id}")
    public UserEntity updateEmail(@PathVariable Long id, @RequestBody Map<String, String> email) {
        String emailAdd = email.get("email");
        return userService.updateEmail(id, emailAdd);
    }

    @GetMapping("/friend_requests/{id}")
    public List<UserEntity> getFriendRequests(@PathVariable Long id) {
        return userService.getFriendRequests(id);
    }

    @GetMapping("/friend_list/{id}")
    public List<UserEntity> getFriendList(@PathVariable Long id) {
        return userService.getFriendList(id);
    }

    @PostMapping("/friend_requests/{from}/{to}")
    public UserEntity sendFriendRequests(@PathVariable Long from, @PathVariable Long to) {
        return userService.sendFriendRequest(from, to);
    }

    @PostMapping("/friend_accept/{from}/{to}")
    public UserEntity acceptRequest(@PathVariable Long from, @PathVariable Long to, @RequestParam boolean decision) {
        return userService.acceptRequest(from, to, decision);
    }

    @PostMapping("/blockUser")
    public void blockUser(@RequestParam("blockId") Long blockId, @RequestParam("userId") Long userId)  {
        userService.blockUser(blockId, userId);
    }

    @PostMapping("/unblockUser")
    public void blockUser(@RequestParam("blockId") String blockedUser, @RequestParam("userId") Long userId)  {
        userService.unblockUser(blockedUser, userId);
    }

    @GetMapping("/getBlockedUsers")
    public List<String> getBlockedUsers(@RequestParam("userId") Long userId)  {
        return userService.getBlockedUsers(userId);
    }

    @GetMapping("/check-username")
    public ResponseEntity<Map<String, Boolean>> checkUsername(@RequestParam String username) {
        boolean isUnique = !userService.existsByUsername(username);
        Map<String, Boolean> response = new HashMap<>();
        response.put("isUnique", isUnique);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{userId}/username")
    public ResponseEntity<?> updateUsername(@PathVariable Long userId, @RequestParam String username) {
        if (username.length() > 32 || !username.matches("^[a-zA-Z0-9_]+$")) {
            return ResponseEntity.badRequest().body("Username must be alphanumeric (with underscores) and up to 32 characters.");
        }

        if (userService.existsByUsername(username)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username is already taken.");
        }

        UserEntity updatedUser = userService.updateUsername(userId, username);
        return ResponseEntity.ok(updatedUser);
    }

    @PutMapping("/{userId}/add-list")
    public ResponseEntity<UserEntity> addListToUser(@PathVariable Long userId, @RequestParam Long listId) {
        UserEntity updatedUser = userService.addListToUser(userId, listId);
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping("/{userId}/lists")
    public ResponseEntity<List<ListEntity>> getUserLists(@PathVariable Long userId) {
        List<ListEntity> lists = userService.getUserLists(userId);
        return ResponseEntity.ok(lists);
    }

    @GetMapping("/chat/{id}")
    public List<MediaEntity> chat(@PathVariable Long id){
        return userService.chatResponse(id);
    }

    @GetMapping("/highest-rated/")
    public List<MediaEntity> highestRated() {
        return userService.getHighestRatedMedia();
    }

    @PostMapping("/list")
    public List<UserEntity> getListOfUsers(@RequestBody List<Long> userIds) {
        return userService.getListOfUsers(userIds);
    }
}
