package com.flatgate.controller;

import com.flatgate.dto.GuestRequest;
import com.flatgate.entity.Guest;
import com.flatgate.service.GuestService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/guest")
@RequiredArgsConstructor
public class GuestController {

    private final GuestService guestService;

    @PostMapping
    public Guest addGuest(
            Authentication authentication,
            @RequestBody GuestRequest request) {

        return guestService.addGuest(authentication.getName(), request);
    }

    @GetMapping
    public List<Guest> getGuestList(Authentication authentication) {

        return guestService.getGuestList(authentication.getName());
    }

    @PutMapping("/cancel/{guestId}")
    public Guest cancelGuest(@PathVariable Long guestId) {

        return guestService.cancelGuest(guestId);
    }

}