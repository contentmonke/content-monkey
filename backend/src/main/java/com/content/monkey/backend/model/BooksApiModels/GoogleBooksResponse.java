package com.content.monkey.backend.model.BooksApiModels;

import java.util.List;

public class GoogleBooksResponse {
    private List<BookItem> items;

    public List<BookItem> getItems() {
        return items;
    }

    public void setItems(List<BookItem> items) {
        this.items = items;
    }

    @Override
    public String toString() {
        return "GoogleBooksResponse{" +
                "items=" + items +
                '}';
    }
}