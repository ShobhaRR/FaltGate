package com.flatgate.controller;

import com.flatgate.dto.AdminDashboardResponse;
import com.flatgate.dto.AdminGuestRequest;
import com.flatgate.dto.AdminGuestResponse;
import com.flatgate.dto.ApartmentResponse;
import com.flatgate.entity.Guest;
import com.flatgate.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/dashboard")
    public AdminDashboardResponse getDashboard() {
        return adminService.getDashboard();
    }

    @GetMapping("/apartments")
    public List<ApartmentResponse> getApartments() {
        return adminService.getApartments();
    }

    @GetMapping("/guests")
    public List<AdminGuestResponse> getAllGuests() {
        return adminService.getAllGuests();
    }

    @PostMapping("/guest")
    public Guest addGuest(@RequestBody AdminGuestRequest request) {
        return adminService.addGuest(request);
    }
}
