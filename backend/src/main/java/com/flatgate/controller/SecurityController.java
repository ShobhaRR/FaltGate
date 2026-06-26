package com.flatgate.controller;

import com.flatgate.dto.SecurityDashboardResponse;
import com.flatgate.entity.Guest;
import com.flatgate.service.SecurityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/security")
@RequiredArgsConstructor
public class SecurityController {

    private final SecurityService securityService;

    @GetMapping("/dashboard")
    public SecurityDashboardResponse getSecurityDashboard() {

        return securityService.getSecurityDashboard();
    }

    @GetMapping("/today")
    public List<Guest> todayVisitors() {

        return securityService.getTodayVisitors();
    }

    @GetMapping("/all")
    public List<Guest> allVisitors() {

        return securityService.getAllVisitors();
    }

    @PutMapping("/checkin/{guestId}")
    public ResponseEntity<Guest> checkIn(@PathVariable Long guestId) {
        try {
            return ResponseEntity.ok(securityService.checkIn(guestId));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/checkout/{guestId}")
    public ResponseEntity<Guest> checkOut(@PathVariable Long guestId) {
        try {
            return ResponseEntity.ok(securityService.checkOut(guestId));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}