package com.flatgate.service;

import com.flatgate.dto.AuthResponse;
import com.flatgate.dto.LoginRequest;
import com.flatgate.dto.RegisterRequest;
import com.flatgate.entity.Apartment;
import com.flatgate.entity.User;
import com.flatgate.enums.Role;
import com.flatgate.repository.ApartmentRepository;
import com.flatgate.repository.UserRepository;
import com.flatgate.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final ApartmentRepository apartmentRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public String register(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Email already exists";
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setMobile(request.getMobile());
        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );
        user.setRole(request.getRole());

        user = userRepository.save(user);

        // Create Apartment record only for apartment users
        if (request.getRole() == Role.APARTMENT) {

            Apartment apartment = new Apartment();

            apartment.setBlockName(request.getBlockName());
            apartment.setFlatNo(request.getFlatNo());
            apartment.setOwnerName(request.getName());
            apartment.setOwnerMobile(request.getMobile());
            apartment.setUser(user);

            apartmentRepository.save(apartment);
        }

        return "Registration successful";
    }

    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElse(null);

        if (user == null) {
            return new AuthResponse("Invalid email", null, null, null);
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return new AuthResponse("Invalid password", null, null, null);
        }

        String token = jwtService.generateToken(user.getEmail());

        return new AuthResponse("Login successful", token, user.getRole().name(), user.getId());
    }
}