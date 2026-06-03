package com.rafaelfelix.backend.exception;

import com.rafaelfelix.backend.dto.ErrorResponseDTO;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(
            InvalidCredentialsException.class
    )
    public ResponseEntity<ErrorResponseDTO>
    handleInvalidCredentials(
            InvalidCredentialsException ex
    ) {

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(
                        new ErrorResponseDTO(
                                ex.getMessage(),
                                HttpStatus.UNAUTHORIZED.value(),
                                LocalDateTime.now()
                        )
                );
    }

    @ExceptionHandler(
            EmailAlreadyExistsException.class
    )
    public ResponseEntity<ErrorResponseDTO>
    handleEmailAlreadyExists(
            EmailAlreadyExistsException ex
    ) {

        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(
                        new ErrorResponseDTO(
                                ex.getMessage(),
                                HttpStatus.CONFLICT.value(),
                                LocalDateTime.now()
                        )
                );
    }

    @ExceptionHandler(
            ResourceNotFoundException.class
    )
    public ResponseEntity<ErrorResponseDTO>
    handleResourceNotFound(
            ResourceNotFoundException ex
    ) {

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(
                        new ErrorResponseDTO(
                                ex.getMessage(),
                                HttpStatus.NOT_FOUND.value(),
                                LocalDateTime.now()
                        )
                );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponseDTO>
    handleGenericException(
            Exception ex
    ) {

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(
                        new ErrorResponseDTO(
                                "Erro interno do servidor",
                                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                                LocalDateTime.now()
                        )
                );
    }
}