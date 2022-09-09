package com.backend.Exceptions;

import lombok.Data;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data @Slf4j // import the log
public class CustomException extends RuntimeException {

    private Date timestamp;
    private HttpStatus status;
    private List<CustomException> nestedExceptions;

    public CustomException(String message, HttpStatus status) {
        super(message);
        this.status = status;
        this.timestamp = new Date();
        this.nestedExceptions = new ArrayList<>();
        log.info(message);
    }

}
