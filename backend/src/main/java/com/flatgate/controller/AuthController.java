package com.flatgate.controller;

import com.flatgate.dto.AuthResponse;
import com.flatgate.dto.LoginRequest;
import com.flatgate.dto.RegisterRequest;
import com.flatgate.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest request) {
        return new AuthResponse(authService.register(request), null, null, null);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        if (response.getToken() == null) {
            return ResponseEntity.status(401).body(response);
        }
        return ResponseEntity.ok(response);
    }
}
