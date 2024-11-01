package com.content.monkey.backend.exceptions;

public class UserAlreadyBlocked extends RuntimeException {
    public UserAlreadyBlocked(String message) {
        super(message);
    }
}
