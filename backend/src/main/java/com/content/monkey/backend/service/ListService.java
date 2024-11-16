package com.content.monkey.backend.service;

import com.content.monkey.backend.model.ListEntity;
import com.content.monkey.backend.repository.ListRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListService {

    private final ListRepository listRepository;

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

    public ListEntity updateList(Long id, ListEntity updatedList) {
        ListEntity existingList = getListById(id);
        existingList.setName(updatedList.getName());
        existingList.setDescription(updatedList.getDescription());
        existingList.setPicture(updatedList.getPicture());
        existingList.setMediaIds(updatedList.getMediaIds());
        return listRepository.save(existingList);
    }

    public void deleteList(Long id) {
        listRepository.deleteById(id);
    }
}