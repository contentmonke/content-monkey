package com.content.monkey.backend.model;

import java.util.List;

public class GoogleBooksResponse {
    private List<BookItem> items;

    public List<BookItem> getItems() {
        return items;
    }

    public void setItems(List<BookItem> items) {
        this.items = items;
    }

}