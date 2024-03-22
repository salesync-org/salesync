package org.salesync.authentication.exceptions;

import jakarta.ws.rs.NotAuthorizedException;
import org.salesync.authentication.dtos.ErrorResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AuthHandler {

    @ExceptionHandler(NotAuthorizedException.class)
    public ResponseEntity<ErrorResponseDto> handleNotAuthorizedException(NotAuthorizedException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                ErrorResponseDto.builder()
                        .message(e.getMessage())
                        .status(HttpStatus.UNAUTHORIZED.value())
                        .build()
        );
    }
}
