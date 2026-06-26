package com.flatgate.service;

import com.flatgate.dto.SecurityDashboardResponse;
import com.flatgate.entity.Guest;
import com.flatgate.enums.GuestStatus;
import com.flatgate.repository.GuestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SecurityService {

    private final GuestRepository guestRepository;

    public SecurityDashboardResponse getSecurityDashboard() {

        LocalDate today = LocalDate.now();
        long todayVisitors = guestRepository.countByVisitDate(today);
        long checkedIn = guestRepository.countByVisitDateAndStatus(today, GuestStatus.ENTERED);
        long expectedVisitors = guestRepository.countByVisitDateAndStatus(today, GuestStatus.PENDING);

        return new SecurityDashboardResponse(todayVisitors, checkedIn, expectedVisitors);
    }

    public List<Guest> getTodayVisitors() {
        return guestRepository.findByVisitDate(LocalDate.now());
    }

 public List<Guest> getAllVisitors() {
        return guestRepository.findAll();
    }
    public Guest checkIn(Long guestId) {

        Guest guest = guestRepository.findById(guestId)
                .orElseThrow();

        guest.setStatus(GuestStatus.ENTERED);
        guest.setCheckinTime(LocalDateTime.now());

        return guestRepository.save(guest);
    }

    public Guest checkOut(Long guestId) {

        Guest guest = guestRepository.findById(guestId)
                .orElseThrow();

        guest.setStatus(GuestStatus.EXITED);
        guest.setCheckoutTime(LocalDateTime.now());

        return guestRepository.save(guest);
    }
}