package com.content.monkey.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class InvalidRequestFieldsException extends RuntimeException{
    public InvalidRequestFieldsException() {
        super("Invalid Request Fields");
    }
}
