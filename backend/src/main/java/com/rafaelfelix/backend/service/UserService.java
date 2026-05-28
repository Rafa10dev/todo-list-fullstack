package com.rafaelfelix.backend.service;

import com.rafaelfelix.backend.dto.LoginDTO;
import com.rafaelfelix.backend.dto.LoginResponseDTO;
import com.rafaelfelix.backend.dto.RegisterDTO;
import com.rafaelfelix.backend.entity.User;
import com.rafaelfelix.backend.exception.ResourceNotFoundException;
import com.rafaelfelix.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.rafaelfelix.backend.security.JwtService;


@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    public User register(RegisterDTO dto){
        String encryptedPassword = passwordEncoder.encode(dto.getPassword());

        User user = User.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .password(encryptedPassword)
                .build();

        return repository.save(user);
    }

    public LoginResponseDTO login(LoginDTO dto){
        User user = repository
                .findByEmail(dto.getEmail())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Usuário não encontrado")
                );

        boolean passwordMatches = passwordEncoder.matches(
                dto.getPassword(),
                user.getPassword()
        );

        if(!passwordMatches){
            throw new RuntimeException("Senha inválida");
        }

        String token = jwtService.generateToken(user.getEmail());

        return new LoginResponseDTO(token);
    }
}
