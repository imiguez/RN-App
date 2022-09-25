package com.backend.Exceptions;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ApiExceptionHandler extends ResponseEntityExceptionHandler {


    @ExceptionHandler(value = CustomException.class)
    public ResponseEntity<CustomException> customException(CustomException e) {
        return new ResponseEntity<>(e, e.getStatus());
    }

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(SQLException.class)
    @ResponseBody
    public ResponseEntity<GeneralSQLException> generalSQLException(SQLException e) {
        GeneralSQLException sqlException = new GeneralSQLException(
                "SQLException: "+e.getMessage(),
                HttpStatus.CONFLICT,
                e.getSQLState()+" "+Integer.toString(e.getErrorCode())
        );
        return new ResponseEntity<>(sqlException, sqlException.getStatus());
    }
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        Map<String, String> invalidations = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            FieldError field = ((FieldError) error);
            invalidations.put(field.getField(), error.getDefaultMessage());
        });
        return new ResponseEntity<>(invalidations, HttpStatus.BAD_REQUEST);
    }
}
