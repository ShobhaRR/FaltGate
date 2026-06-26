package com.flatgate.controller;

import com.flatgate.dto.DashboardResponse;
import com.flatgate.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/apartment")
    public DashboardResponse getApartmentDashboard(Authentication authentication) {

        return dashboardService.getApartmentDashboard(authentication.getName());
    }

}
