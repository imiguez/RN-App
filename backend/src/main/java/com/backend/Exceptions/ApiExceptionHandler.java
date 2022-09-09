package com.backend.Exceptions;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Date;

@RestControllerAdvice
public class ApiExceptionHandler {


    @ExceptionHandler(value = CustomException.class)
    public ResponseEntity<CustomException> defaultException(CustomException e) {
        return new ResponseEntity<>(e, e.getStatus());
    }

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler({java.sql.SQLIntegrityConstraintViolationException.class})
    @ResponseBody
    public ResponseEntity<ConflictException> sqlException(ConflictException e) {
        return new ResponseEntity<>(e, e.getStatus());
    }

}
