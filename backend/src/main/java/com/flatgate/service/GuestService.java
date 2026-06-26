package com.flatgate.service;

import com.flatgate.dto.GuestRequest;
import com.flatgate.entity.Guest;
import com.flatgate.entity.User;
import com.flatgate.enums.GuestStatus;
import com.flatgate.repository.GuestRepository;
import com.flatgate.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GuestService {

    private final GuestRepository guestRepository;
    private final UserRepository userRepository;

    public Guest addGuest(String email, GuestRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow();

        Guest guest = new Guest();

        guest.setGuestName(request.getGuestName());
        guest.setGuestMobile(request.getGuestMobile());
        guest.setPurpose(request.getPurpose());
        guest.setVisitDate(request.getVisitDate());
        guest.setVisitTime(request.getVisitTime());
        guest.setVehicleNumber(request.getVehicleNumber());
        guest.setStatus(GuestStatus.PENDING);
        guest.setUser(user);

        return guestRepository.save(guest);
    }

    public List<Guest> getGuestList(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow();

        return guestRepository.findByUser(user);
    }

    public Guest cancelGuest(Long guestId) {

        Guest guest = guestRepository.findById(guestId)
                .orElseThrow();

        guest.setStatus(GuestStatus.CANCELLED);

        return guestRepository.save(guest);
    }

}