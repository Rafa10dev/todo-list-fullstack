package com.rafaelfelix.backend.dto;

import java.time.LocalDateTime;

public record ErrorResponseDTO(
        String message,
        int status,
        LocalDateTime timestamp
) {
}