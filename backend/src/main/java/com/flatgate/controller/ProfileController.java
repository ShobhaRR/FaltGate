package com.flatgate.controller;

import com.flatgate.dto.ProfileRequest;
import com.flatgate.dto.ProfileResponse;
import com.flatgate.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping
    public ProfileResponse getProfile(Authentication authentication) {

        return profileService.getProfile(authentication.getName());
    }

    @PutMapping
    public ProfileResponse updateProfile(
            Authentication authentication,
            @RequestBody ProfileRequest request) {

        return profileService.updateProfile(authentication.getName(), request);
    }

}
