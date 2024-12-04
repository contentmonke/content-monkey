package com.content.monkey.backend.service;

import com.content.monkey.backend.chatgpt.ChatGPTRequest;
import com.content.monkey.backend.chatgpt.ChatGPTResponse;
import com.content.monkey.backend.exceptions.UserNotFoundException;
import com.content.monkey.backend.model.ListEntity;
import com.content.monkey.backend.repository.ListRepository;
import com.content.monkey.backend.model.MediaEntity;
import com.content.monkey.backend.model.UserEntity;
import com.content.monkey.backend.model.dto.MediaEntityDTO;
import com.content.monkey.backend.repository.MediaRepository;
import com.content.monkey.backend.repository.UserRepository;
import org.apache.catalina.User;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    private MediaRepository mediaRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ListRepository listRepository;

    public UserEntity getUser(Long id) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException());
        return user;
    }

    public List<UserEntity> getAllExamples() {
        return userRepository.findAll();
    }

    public UserEntity createUserEntity (UserEntity created) {
        List<UserEntity> user = userRepository.findByName(created.getName());
        System.out.println(user);
        System.out.println(created.getName());
        if (!user.isEmpty()) {
            return user.getFirst();
        } else {
            created.setUsername(generateUniqueUsername(created.getName()));
            return userRepository.save(created);
        }
    }

    public List<UserEntity> getSingleUser(String name) {
        List<UserEntity> users = userRepository.findByName(name);
        if (!users.isEmpty() && (users.getFirst().getFriend_list() == null ||
                users.getFirst().getFriend_requests() == null)) {
            users.getFirst().setFriend_list(new ArrayList<>());
            users.getFirst().setFriend_requests(new ArrayList<>());
        }
        if (!users.isEmpty()) {
            userRepository.save(users.getFirst());
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
            favorite_titles.add(mediaRepository.findByid(favorite_media.get(i)).get(0).getMediaTitle());
        }
        return favorite_titles;
    }

    public void setFavorites(Long id, List<String> favorites) {
        UserEntity user = getUser(id);
        List<Long> favorite_media = new ArrayList<>();

        for(int i = 0; i < favorites.size(); i++) {
            favorite_media.add(mediaRepository.findByMediaTitle(favorites.get(i)).get(0).getId());
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
        return user.get(0);
    }

    public void unblockUser(String blockedUser, Long userId) {
        UserEntity user = getUser(userId);
        UserEntity blockedUserE = getSingleUser(blockedUser).get(0);
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
        String baseUsername;
        if (name.indexOf('@') > 1) {
            baseUsername = name.substring(0, name.indexOf('@'));
        } else {
            baseUsername = name.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
        }

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
    public List<MediaEntity> chatResponse(Long id) {
        UserEntity user = getUser(id);
        String[] media_recs = user.getMediaRecs();
        if (media_recs != null) {
//            return user.getMediaRecs();
            // iterate through and fetch media objects then return those media objects as 2d array to front end.
            List<String> mediaAsArrList = new ArrayList<>(Arrays.asList(media_recs));
            return returnListOfMedia(mediaAsArrList);
        }
        List<Long> favMedia = (user.getFavoriteMedia() == null) ? new ArrayList<>() : user.getFavoriteMedia();
        List<MediaEntity> books = new ArrayList<>();
        List<MediaEntity> tvShows = new ArrayList<>();
        List<MediaEntity> movies = new ArrayList<>();
        List<MediaEntity> games = new ArrayList<>();
        List<Optional<MediaEntity>> medias = new ArrayList<>();
        for (Long i : favMedia) {
            medias.add(mediaRepository.findById(i));
//            System.out.println(mediaRepository.findById(i));
        }
        label:
        for (int i = 0; i < medias.size(); i++) {
            if (medias.get(i).isPresent()) {
                MediaEntity m = medias.get(i).get();
                switch (m.getMediaType()) {
                    case "Book":
                        books.add(m);
                        break;
                    case "Movie":
                        movies.add(m);
                        break;
                    case "TV Show":
                        tvShows.add(m);
                        break;
                    case "Video Game":
                        games.add(m);
                        break;
                    default:
                        break label;
                }
            }
        }

        String prompt = returnBookTitles(books) + returnGamesTitles(games) + returnTVShowTitles(tvShows) + returnMovieTitles(movies);
        System.out.println(prompt);
        // Use mediaService.getMediaByTitleAndType from media controller to find the media entity. Then return the media entities to the frontend
        // to use the fetchMedia to fetch the link and pass the state.
        if (prompt.isEmpty()) {
            return null;
        }
        ChatGPTRequest request = new ChatGPTRequest(model, prompt);
        ChatGPTResponse chatGptResponse = template.postForObject(apiURL, request, ChatGPTResponse.class);
        String res = chatGptResponse.getChoices().get(0).getMessage().getContent();
        List<String> recsAsList = Arrays.asList(res.split(","));
        String[] recsToArray = new String[recsAsList.size()];
        recsAsList.toArray(recsToArray);
        System.out.println(Arrays.toString(recsToArray));
        user.setMediaRecs(recsToArray);
        userRepository.save(user);
        return returnListOfMedia(recsAsList);
    }

    public List<MediaEntity> returnListOfMedia(List<String> recsAsList) {
        List<String> firstFour = recsAsList.subList(0, 3);
//        System.out.println(firstFour);
        List<String> secondFour = recsAsList.size() >= 6 ? recsAsList.subList(3, 6) : new ArrayList<>();
//        System.out.println(secondFour);
        List<String> thirdFour = recsAsList.size() >= 9 ? recsAsList.subList(6, 9) : new ArrayList<>();
//        System.out.println(thirdFour);
        List<String> fourthFour = recsAsList.size() == 12 ? recsAsList.subList(10,12) : new ArrayList<>();
//        System.out.println(fourthFour);
        List<MediaEntity> mediaListFromRecs = new ArrayList<>();

        for (String s : firstFour){
            List<MediaEntity> m = mediaRepository.findByMediaTitle(s);
            System.out.println(m);
            mediaListFromRecs.add(m.get(0));
        }

        for (String s : secondFour){
            List<MediaEntity> m = mediaRepository.findByMediaTitleAndMediaType(s, "Video Game");
            m = s.contains("Zelda") ? mediaRepository.findByid(1221L) : m;
            m = s.contains("Red") ? mediaRepository.findByid(1208L) : m;
            m = s.contains("Witcher") ? mediaRepository.findByid(1174L) : m;
//            List<MediaEntity> m = mediaRepository.findByMediaTitle(s);
            System.out.println(m);
            mediaListFromRecs.add(m.get(0));
        }

        for (String s : thirdFour){
//            List<MediaEntity> m = mediaRepository.findByMediaTitleAndMediaType(s, "TV Show");
            List<MediaEntity> m = mediaRepository.findByMediaTitle(s);
            System.out.println(m);
            mediaListFromRecs.add(m.get(0));
        }

        for (String s : fourthFour){
            List<MediaEntity> m = mediaRepository.findByMediaTitle(s);
            mediaListFromRecs.add(m.get(0));
        }
        return mediaListFromRecs;
    }


    public String returnBookTitles(List<MediaEntity> books) {
        if (books.isEmpty()) {
            return "";
        }
        StringBuilder prompt = new StringBuilder("Given I like the following books, give me 3 more book recommendations" +
                ", 3 video game recommendations, 3 TV show recommendations, and 3 movie recommendations. Give your response as a comma separated list with only the titles." +
                " Don't include the works \"book recommendations\", TV show recommendations. I just want a plain, one line list of 12 titles, 3 of each category.");
        for (int i = 0; i < books.size(); i++) {
            prompt.append(books.get(i).getMediaTitle());
            prompt.append(",");
        }
        return prompt.toString();
    }

    public String returnTVShowTitles(List<MediaEntity> shows) {
        if (shows.isEmpty()) {
            return "";
        }
        StringBuilder prompt = new StringBuilder("Given I like the following TV shows, give me 3 more tv show recommendations. Give your response as a comma separated list");
        for (int i = 0; i < shows.size(); i++) {
            prompt.append(shows.get(i).getMediaTitle());
            prompt.append(",");
        }
        return prompt.toString();
    }

    public String returnGamesTitles(List<MediaEntity> games) {
        if (games.isEmpty()) {
            return "";
        }
        StringBuilder prompt = new StringBuilder("Given I like the following video games, give me 3 more video game recommendations. Give your response as a comma separated list");
        for (int i = 0; i < games.size(); i++) {
            prompt.append(games.get(i).getMediaTitle());
            prompt.append(",");
        }
        return prompt.toString();
    }

    public String returnMovieTitles(List<MediaEntity> movies) {
        if (movies.isEmpty()) {
            return "";
        }
        StringBuilder prompt = new StringBuilder("Given I like the following movies, give me 3 more movie recommendations. Give your response as a comma separated list");
        for (int i = 0; i < movies.size(); i++) {
            prompt.append(movies.get(i).getMediaTitle());
            prompt.append(",");
        }
        return prompt.toString();
    }

    public UserEntity updateUsername(Long userId, String newUsername) {
        UserEntity user = getUser(userId);
        user.setUsername(newUsername);

        return userRepository.save(user); // Saves updated user with new username
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public UserEntity addListToUser(Long userId, Long listId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);

        List<Long> listIds = user.getListIds();
        if (listIds == null) {
            listIds = new ArrayList<>();
            user.setListIds(listIds);
        }

        if (!listIds.contains(listId)) {
            listIds.add(listId);
            user.setListIds(listIds);
        }

        return userRepository.save(user);
    }

    public List<ListEntity> getUserLists(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);

        return listRepository.findAllById(user.getListIds());
    }

    public List<MediaEntity> getHighestRatedMedia() {
        List<MediaEntity> highestRatedBooks = mediaRepository.findHighestRated("Book");
        List<MediaEntity> highestRatedMovies = mediaRepository.findHighestRated("Movie");
        List<MediaEntity> highestRatedTVShow = mediaRepository.findHighestRated("TV Show");
        List<MediaEntity> highestRatedVideoGame = mediaRepository.findHighestRated("Video Game");
        List<MediaEntity> allHighest = new ArrayList<>(highestRatedBooks);
        allHighest.addAll(highestRatedMovies);
        allHighest.addAll(highestRatedTVShow);
        allHighest.addAll(highestRatedVideoGame);
        System.out.println(allHighest);
        Set<String> seenTitles = new HashSet<>();
        List<MediaEntity> uniqueMediaList = allHighest.stream()
                .filter(media -> seenTitles.add(media.getMediaTitle()))
                .toList();

        // Print the unique media list
//        uniqueMediaList.forEach(System.out::println);
        return uniqueMediaList;
    }

    public List<UserEntity> getListOfUsers(List<Long> ids) {
        return userRepository.findAllById(ids);
    }
}
