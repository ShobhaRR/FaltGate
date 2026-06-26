package com.flatgate.service;

import com.flatgate.dto.DashboardResponse;
import com.flatgate.entity.User;
import com.flatgate.enums.GuestStatus;
import com.flatgate.repository.GuestRepository;
import com.flatgate.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserRepository userRepository;
    private final GuestRepository guestRepository;

    public DashboardResponse getApartmentDashboard(String email) {

        User user = userRepository.findByEmail(email).orElseThrow();

        long totalGuests = guestRepository.countByUser(user);
        long todayGuests = guestRepository.countByUserAndVisitDate(user, LocalDate.now());
        long checkedIn = guestRepository.countByUserAndStatus(user, GuestStatus.ENTERED);

        return new DashboardResponse(totalGuests, todayGuests, checkedIn);
    }

}
