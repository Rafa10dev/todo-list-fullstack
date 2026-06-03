package com.rafaelfelix.backend.controller;

import com.rafaelfelix.backend.dto.RegisterDTO;
import com.rafaelfelix.backend.dto.UserRequestDTO;
import com.rafaelfelix.backend.entity.User;
import com.rafaelfelix.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.rafaelfelix.backend.dto.LoginDTO;
import com.rafaelfelix.backend.dto.LoginResponseDTO;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService service;

    @PostMapping("/register")
    public ResponseEntity<UserRequestDTO> register(@Valid @RequestBody RegisterDTO dto){
        User user = service.register(dto);

        UserRequestDTO reponse =
                new UserRequestDTO(
                        user.getId(),
                        user.getName(),
                        user.getEmail()
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(reponse);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginDTO dto){
        LoginResponseDTO response = service.login(dto);

        return ResponseEntity.ok(response);
    }
}
