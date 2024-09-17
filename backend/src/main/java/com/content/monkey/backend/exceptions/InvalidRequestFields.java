package com.content.monkey.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class InvalidRequestFields extends RuntimeException{
    public InvalidRequestFields() {
        super("Invalid Request Fields");
    }
}
