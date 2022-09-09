package com.backend.Exceptions;

import org.springframework.http.HttpStatus;

public class NotFoundException extends CustomException {

    public NotFoundException(String resource, String field, String fieldValue) {
        super(
                String.format("The resource %s with the field %2s with the value %3s doesn't exists.", resource, field, fieldValue),
                HttpStatus.NOT_FOUND
        );
    }

}
