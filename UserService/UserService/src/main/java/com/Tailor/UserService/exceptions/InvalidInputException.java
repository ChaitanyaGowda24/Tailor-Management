package com.Tailor.UserService.exceptions;

public class InvalidInputException extends RuntimeException {

    public InvalidInputException(String message) {
        super(message);  // Ensure message is passed here
    }
}
