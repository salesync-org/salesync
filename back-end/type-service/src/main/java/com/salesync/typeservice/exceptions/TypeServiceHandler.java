package com.salesync.typeservice.exceptions;

import com.salesync.typeservice.dtos.ResponseErrorDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.text.MessageFormat;

@RestControllerAdvice
public class TypeServiceHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleNotValidException(MethodArgumentNotValidException ex) {
        String message = ex.getMessage();
        if(ex.getFieldError() != null) {
            message = MessageFormat.format("{0} {1}", ex.getFieldError().getField(), ex.getFieldError().getDefaultMessage());
        }

        return ResponseEntity.badRequest().body(
                ResponseErrorDto.builder()
                        .status(HttpStatus.BAD_REQUEST.value())
                        .message(message)
                        .build()
        );
    }

    @ExceptionHandler(ObjectNotFoundException.class)
    public ResponseEntity<?> handleNotFoundException(ObjectNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                ResponseErrorDto.builder()
                        .status(HttpStatus.NOT_FOUND.value())
                        .message(ex.getMessage())
                        .build()
        );
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> handleIllegalArgumentException(IllegalArgumentException ex) {
        return ResponseEntity.badRequest().body(
                ResponseErrorDto.builder()
                        .status(HttpStatus.BAD_REQUEST.value())
                        .message(ex.getMessage())
                        .build()
        );
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<?> handleHttpMessageNotReadableException(HttpMessageNotReadableException ex) {
        return ResponseEntity.badRequest().body(
                ResponseErrorDto.builder()
                        .status(HttpStatus.BAD_REQUEST.value())
                        .message(ex.getMessage())
                        .build()
        );
    }
}
