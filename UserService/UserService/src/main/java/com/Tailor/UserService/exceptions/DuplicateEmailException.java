package com.Tailor.UserService.exceptions;

public class DuplicateEmailException extends RuntimeException{

    public DuplicateEmailException (String message) {
        super(message);
    }
}
