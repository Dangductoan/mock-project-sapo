package com.sapo.mockproject.exception;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

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
        Throwable cause = ex.getCause();
        if (cause instanceof ConstraintViolationException) {
            Map<String, ErrorDetails> data = new HashMap<>();
            ErrorDetails errorDetails = new ErrorDetails(
                    new Date(),
                    HttpStatus.BAD_REQUEST.value(),
                    HttpStatus.BAD_REQUEST.getReasonPhrase(),
                    "Th??ng tin kh??ng h???p l???!",
                    request.getRequest().getRequestURI()
            );
            data.put("error", errorDetails);
            return new ResponseEntity<>(data, HttpStatus.BAD_REQUEST);
        }

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

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, ErrorDetails>> validateException(MethodArgumentNotValidException ex,
                                                                       ServletWebRequest request) {
        Map<String, ErrorDetails> data = new HashMap<>();
        ErrorDetails errorDetails = new ErrorDetails(
                new Date(),
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                Objects.requireNonNull(ex.getFieldError()).getDefaultMessage(),
                request.getRequest().getRequestURI()
        );
        data.put("error", errorDetails);
        return new ResponseEntity<>(data, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<Map<String, ErrorDetails>> validateException(MethodArgumentTypeMismatchException ex,
                                                                       ServletWebRequest request) {
        Map<String, ErrorDetails> data = new HashMap<>();
        ErrorDetails errorDetails = new ErrorDetails(
                new Date(),
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                ex.getName() + " ph???i thu???c ki???u " + Objects.requireNonNull(ex.getRequiredType()).getName(),
                request.getRequest().getRequestURI()
        );
        data.put("error", errorDetails);
        return new ResponseEntity<>(data, HttpStatus.BAD_REQUEST);
    }
}
