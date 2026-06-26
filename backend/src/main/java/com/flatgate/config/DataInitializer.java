package com.flatgate.config;

import com.flatgate.entity.User;
import com.flatgate.enums.Role;
import com.flatgate.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        fixPlaintextPasswords();
        seed("Admin", "admin@flatgate.com", "9000000001", "admin123", Role.ADMIN);
        seed("Security", "security@flatgate.com", "9000000002", "security123", Role.SECURITY);
    }

    // Encodes any password that was stored as plaintext (not BCrypt)
    private void fixPlaintextPasswords() {
        userRepository.findAll().forEach(user -> {
            if (!user.getPassword().startsWith("$2")) {
                user.setPassword(passwordEncoder.encode(user.getPassword()));
                userRepository.save(user);
            }
        });
    }

    private void seed(String name, String email, String mobile, String password, Role role) {
        userRepository.findByEmail(email).ifPresentOrElse(
            existing -> {
                // Fix plaintext passwords — BCrypt hashes always start with $2
                if (!existing.getPassword().startsWith("$2")) {
                    existing.setPassword(passwordEncoder.encode(existing.getPassword()));
                    userRepository.save(existing);
                }
            },
            () -> {
                User user = new User();
                user.setName(name);
                user.setEmail(email);
                user.setMobile(mobile);
                user.setPassword(passwordEncoder.encode(password));
                user.setRole(role);
                userRepository.save(user);
            }
        );
    }
}
