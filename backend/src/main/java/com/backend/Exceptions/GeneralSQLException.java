package com.backend.Exceptions;

import org.springframework.http.HttpStatus;

public class GeneralSQLException extends CustomException {

    private String stateCode;

    public GeneralSQLException(String message, HttpStatus status, String stateCode) {
        super(message, status);
        this.stateCode = stateCode;
    }
}
