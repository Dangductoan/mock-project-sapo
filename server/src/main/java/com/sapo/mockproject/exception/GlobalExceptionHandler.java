package com.sapo.mockproject.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.ServletWebRequest;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map<String, ErrorDetails>> resourceNotFoundException(ResourceNotFoundException ex,
                                                                               ServletWebRequest request) {
        Map<String, ErrorDetails> data = new HashMap<>();
        ErrorDetails errorDetails = new ErrorDetails(
                new Date(),
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.getReasonPhrase(),
                ex.getMessage(),
                request.getRequest().getRequestURI()
        );
        data.put("error", errorDetails);
        return new ResponseEntity<>(data, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(InvalidResourceException.class)
    public ResponseEntity<Map<String, ErrorDetails>> invalidResourceException(InvalidResourceException ex,
                                                                              ServletWebRequest request) {
        Map<String, ErrorDetails> data = new HashMap<>();
        ErrorDetails errorDetails = new ErrorDetails(
                new Date(),
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                ex.getMessage(),
                request.getRequest().getRequestURI()
        );
        data.put("error", errorDetails);
        return new ResponseEntity<>(data, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, ErrorDetails>> globalExceptionHandler(Exception ex,
                                                                            ServletWebRequest request) {
        Map<String, ErrorDetails> data = new HashMap<>();
        ErrorDetails errorDetails = new ErrorDetails(
                new Date(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(),
                ex.getMessage(),
                request.getRequest().getRequestURI()
        );
        data.put("error", errorDetails);
        return new ResponseEntity<>(data, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
