package com.content.monkey.backend.service;

import com.content.monkey.backend.model.ListEntity;
import com.content.monkey.backend.model.UserEntity;
import com.content.monkey.backend.repository.ListRepository;
import com.content.monkey.backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ListService {

    private final ListRepository listRepository;
    @Autowired
    private UserRepository userRepository;

    public ListService(ListRepository listRepository) {
        this.listRepository = listRepository;
    }

    public List<ListEntity> getAllLists() {
        return listRepository.findAll();
    }

    public ListEntity getListById(Long id) {
        return listRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("List not found with ID: " + id));
    }

    public ListEntity createList(String name, Long userId) {
        ListEntity newList = new ListEntity();
        newList.setName(name);
        newList.setUserId(userId);
        // The rest of the fields are initialized with default values in the entity
        return listRepository.save(newList);
    }

    public ListEntity updateList(Long id, ListEntity newListData) {
        // Fetch the existing list entity
        ListEntity existingList = listRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("List not found with id: " + id));

        // Update only the specified fields
        if (newListData.getName() != null) {
            existingList.setName(newListData.getName());
        }

        if (newListData.getDescription() != null) {
            existingList.setDescription(newListData.getDescription());
        }

        if (newListData.getPicture() != null) {
            existingList.setPicture(newListData.getPicture());
        }

        // Save the updated list entity
        return listRepository.save(existingList);
    }

    public void deleteList(Long id) {
        listRepository.deleteById(id);
    }

    public void upvoteList(Long listId, Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));

        ListEntity list = listRepository.findById(listId)
                .orElseThrow(() -> new EntityNotFoundException("List not found with id: " + listId));

        // Remove from disliked lists if previously downvoted
        if (user.getListsDislikedByUser().contains(listId)) {
            user.getListsDislikedByUser().remove(listId);
            list.setDownVotes(list.getDownVotes() - 1);
        }

        // Add to liked lists if not already upvoted
        if (!user.getListsLikedByUser().contains(listId)) {
            user.getListsLikedByUser().add(listId);
            list.setUpVotes(list.getUpVotes() + 1);
        }

        userRepository.save(user);
        listRepository.save(list);
    }

    public void downvoteList(Long listId, Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));

        ListEntity list = listRepository.findById(listId)
                .orElseThrow(() -> new EntityNotFoundException("List not found with id: " + listId));

        // Remove from liked lists if previously upvoted
        if (user.getListsLikedByUser().contains(listId)) {
            user.getListsLikedByUser().remove(listId);
            list.setUpVotes(list.getUpVotes() - 1);
        }

        // Add to disliked lists if not already downvoted
        if (!user.getListsDislikedByUser().contains(listId)) {
            user.getListsDislikedByUser().add(listId);
            list.setDownVotes(list.getDownVotes() + 1);
        }

        userRepository.save(user);
        listRepository.save(list);
    }

    public ListEntity addMediaToList(Long listId, Long mediaId) {
        ListEntity list = listRepository.findById(listId)
                .orElseThrow(() -> new EntityNotFoundException("List not found with id: " + listId));

        // Check if media already exists in the list
        if (list.getMediaIds().contains(mediaId)) {
            throw new IllegalArgumentException("Media already exists in the list");
        }

        list.getMediaIds().add(mediaId); // Add media ID to the list
        return listRepository.save(list); // Save the updated list
    }

    public ListEntity removeMediaFromList(Long listId, Long mediaId) {
        ListEntity list = listRepository.findById(listId)
                .orElseThrow(() -> new EntityNotFoundException("List not found with id: " + listId));

        // Remove the media ID if it exists
        if (list.getMediaIds().contains(mediaId)) {
            list.getMediaIds().remove(mediaId);
            return listRepository.save(list); // Save the updated list
        } else {
            throw new IllegalArgumentException("Media not found in the list");
        }
    }

    public ListEntity updateMediaOrder(Long listId, List<Long> mediaIds) {
        ListEntity list = listRepository.findById(listId)
                .orElseThrow(() -> new EntityNotFoundException("List not found with id: " + listId));

        list.setMediaIds(mediaIds); // Replace existing order
        return listRepository.save(list);
    }
}