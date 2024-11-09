package com.content.monkey.backend.service;

import com.content.monkey.backend.chatgpt.ChatGPTRequest;
import com.content.monkey.backend.chatgpt.ChatGPTResponse;
import com.content.monkey.backend.example.app.model.ExampleEntity;
import com.content.monkey.backend.exceptions.UserNotFoundException;
import com.content.monkey.backend.model.UserEntity;
import com.content.monkey.backend.repository.MediaRepository;
import com.content.monkey.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.NoSuchElementException;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private MediaRepository mediaRepository;
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
        created.setUsername(generateUniqueUsername(created.getName()));
        return userRepository.save(created);
    }

    public List<UserEntity> getSingleUser(String username) {
        List<UserEntity> users = userRepository.findByName(username);
        if (!users.isEmpty() && (users.get(0).getFriend_list() == null || users.get(0).getFriend_requests() == null)) {
            users.get(0).setFriend_list(new ArrayList<>());
            users.get(0).setFriend_requests(new ArrayList<>());
        }
        if (!users.isEmpty()) {
            userRepository.save(users.get(0));
        }
        return users;
    }

    public void deleteUserById(Long id) {
        if (userRepository.existsById(id)) {
            UserEntity user = getUser(id);
            for (int i = 0; i < user.getFriend_list().size(); i++) {
                UserEntity tempUser = getUser(Long.valueOf(user.getFriend_list().get(i)));
                tempUser.getFriend_list().remove(String.valueOf(id));
            }
            userRepository.deleteById(id);
        } else {
            throw new NoSuchElementException("User not found");
        }
    }

    public List<UserEntity> getUserByUsernameSearch(String username) {
        // Using repository to search for usernames containing the given keyword
        return userRepository.findClosestMatchByUsername(username);
    }

    public List<UserEntity> getUserByIdSearch(Long id) {
        return userRepository.findClosestMatchById(id);
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

    public UserEntity setPicture(Long id, String picture) {
        UserEntity user = getUser(id);
        user.setPicture(picture);
        return userRepository.save(user);
    }

    public String getPicture(Long id) {
        UserEntity user = getUser(id);
        return user.getPicture();
    }

    public UserEntity addReviewIdToUser(Long id, Long reviewId) {
        UserEntity user = getUser(id);
        if (user.getReviewIds() == null) {
            user.setReviewIds(new ArrayList<>());
        }
        user.getReviewIds().add(reviewId);
        return userRepository.save(user);
    }

    public List<UserEntity> getFriendRequests(Long id) {
        UserEntity user = getUser(id);
        List<UserEntity> usernames = new ArrayList<>();
        if (user.getFriend_requests() == null) {
            return usernames;
        }
        for (int i = 0; i < user.getFriend_requests().size(); i++) {
            UserEntity getUserById = getUser(Long.valueOf(user.getFriend_requests().get(i)));
            usernames.add(getUserById);
        }
        return usernames;
    }

    public UserEntity sendFriendRequest(Long from, Long to) {
        UserEntity user = getUser(to);
        System.out.println("in here");
        if (user.getFriend_requests() == null) {
            user.setFriend_requests(new ArrayList<String>());
        }
        if (user.getFriend_list() == null) {
            user.setFriend_list(new ArrayList<String>());
        }
        System.out.println(user.getFriend_list());
        if (!user.getFriend_requests().contains(String.valueOf(from)) && !user.getFriend_list().contains(String.valueOf(from))) {
            user.getFriend_requests().add((String.valueOf(from)));
        }
        return userRepository.save(user);
    }
    public UserEntity acceptRequest(Long from, Long to, boolean decision) {
        UserEntity user = getUser(to);
        if (user.getFriend_requests() != null) {
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
            if (!user.getFriend_list().contains(String.valueOf(from))) {
                user.getFriend_list().add(String.valueOf(from));
            }
            if (!requester.getFriend_list().add(String.valueOf(to))) {
                requester.getFriend_list().add(String.valueOf(to));
            }
            userRepository.save(user);
            userRepository.save(requester);
        }

        return user;
    }

    public List<UserEntity> getFriendList(Long id) {
        UserEntity user = getUser(id);
        List<UserEntity> usernames = new ArrayList<>();
        if (user.getFriend_list() == null) {
            return usernames;
        }
        for (int i = 0; i < user.getFriend_list().size(); i++) {
            UserEntity getUserById = getUser(Long.valueOf(user.getFriend_list().get(i)));
            usernames.add(getUserById);
        }
        return usernames;
    }

    public List<String> getFavorites(Long id) {
        UserEntity user = getUser(id);

        if (user.getFavoriteMedia() == null || user.getFavoriteMedia().isEmpty()) {
            return null;
        }
        List<Long> favorite_media = user.getFavoriteMedia();
        List<String> favorite_titles = new ArrayList<>();
        for(int i = 0; i < favorite_media.size(); i++) {
            favorite_titles.add(mediaRepository.findByid(favorite_media.get(i)).getFirst().getMediaTitle());
        }
        return favorite_titles;
    }

    public void setFavorites(Long id, List<String> favorites) {
        UserEntity user = getUser(id);
        List<Long> favorite_media = new ArrayList<>();

        for(int i = 0; i < favorites.size(); i++) {
            favorite_media.add(mediaRepository.findByMediaTitle(favorites.get(i)).getFirst().getId());
        }
        user.setFavoriteMedia(favorite_media);
        userRepository.save(user);
    }

    public void blockUser(Long blockId, Long userId) {
        UserEntity user = getUser(userId);
        user.setBlockedUsers(blockId);
        userRepository.save(user);
    }

    public UserEntity getUserByEmail(String email) {
        List<UserEntity> user = userRepository.findByEmail(email);
        return user.getFirst();
    }

    public void unblockUser(String blockedUser, Long userId) {
        UserEntity user = getUser(userId);
        UserEntity blockedUserE = getSingleUser(blockedUser).getFirst();
        List<Long> newBlockedUsers = user.getBlockedUsers();
        newBlockedUsers.remove(blockedUserE.getId());
        user.updateBlockedUsers(newBlockedUsers);
        userRepository.save(user);
    }

    public List<String> getBlockedUsers(Long userId) {
        UserEntity user = getUser(userId);
        List<String> blocked_users = new ArrayList<>();
        for (int i = 0; i < user.getBlockedUsers().size(); i++) {
            UserEntity userById = getUser(user.getBlockedUsers().get(i));
            blocked_users.add(userById.getUsername());
        }
        return blocked_users;
    }

    public String generateUniqueUsername(String name) {
        String baseUsername = name.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
        baseUsername = baseUsername.substring(0, Math.min(baseUsername.length(), 32));
        String username = baseUsername;
        int suffix = 1;

        while (userRepository.existsByUsername(username)) {
            username = baseUsername + suffix;
            if (username.length() > 32) {
                username = username.substring(0, 32);
            }
            suffix++;
        }

        return username;
    }

        @Value("${openai.model}")
    private String model;

    @Value(("${openai.api.url}"))
    private String apiURL;

    @Qualifier("chat")
    @Autowired
    private RestTemplate template;
    public String chatResponse() {
        String prompt = "describe red";
        ChatGPTRequest request=new ChatGPTRequest(model, prompt);
        ChatGPTResponse chatGptResponse = template.postForObject(apiURL, request, ChatGPTResponse.class);
        return chatGptResponse.getChoices().get(0).getMessage().getContent();
    }

    public UserEntity updateUsername(Long userId, String newUsername) {
        UserEntity user = getUser(userId);
        user.setUsername(newUsername);

        return userRepository.save(user); // Saves updated user with new username
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }
}
