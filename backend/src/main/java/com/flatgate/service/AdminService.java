package com.flatgate.service;

import com.flatgate.dto.AdminDashboardResponse;
import com.flatgate.dto.AdminGuestRequest;
import com.flatgate.dto.AdminGuestResponse;
import com.flatgate.dto.ApartmentResponse;
import com.flatgate.entity.Apartment;
import com.flatgate.entity.Guest;
import com.flatgate.enums.GuestStatus;
import com.flatgate.repository.ApartmentRepository;
import com.flatgate.repository.GuestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final ApartmentRepository apartmentRepository;
    private final GuestRepository guestRepository;

    public AdminDashboardResponse getDashboard() {
        long totalApartments = apartmentRepository.count();
        long totalGuests = guestRepository.count();
        LocalDate today = LocalDate.now();
        long todayVisitors = guestRepository.countByVisitDate(today);
        long pendingVisitors = guestRepository.countByVisitDateAndStatus(today, GuestStatus.PENDING);
        return new AdminDashboardResponse(totalApartments, totalGuests, todayVisitors, pendingVisitors);
    }

    public List<ApartmentResponse> getApartments() {
        return apartmentRepository.findAll().stream()
                .map(apt -> new ApartmentResponse(
                        apt.getId(),
                        apt.getOwnerName(),
                        apt.getBlockName(),
                        apt.getFlatNo(),
                        apt.getOwnerMobile(),
                        apt.getUser() != null ? apt.getUser().getEmail() : "",
                        true
                ))
                .collect(Collectors.toList());
    }

    public List<AdminGuestResponse> getAllGuests() {
        return guestRepository.findAll().stream()
                .map(guest -> {
                    String blockName = "";
                    String flatNo = "";
                    if (guest.getUser() != null) {
                        Apartment apt = apartmentRepository.findByUser(guest.getUser()).orElse(null);
                        if (apt != null) {
                            blockName = apt.getBlockName();
                            flatNo = apt.getFlatNo();
                        }
                    }
                    return new AdminGuestResponse(
                            guest.getId(),
                            guest.getGuestName(),
                            guest.getGuestMobile(),
                            blockName,
                            flatNo,
                            guest.getPurpose(),
                            guest.getVisitDate(),
                            guest.getStatus() != null ? guest.getStatus().name() : null
                    );
                })
                .collect(Collectors.toList());
    }

    public Guest addGuest(AdminGuestRequest request) {
        Apartment apartment = apartmentRepository
                .findByBlockNameAndFlatNo(request.getBlockName(), request.getFlatNo())
                .orElseThrow(() -> new RuntimeException("Apartment not found: "
                        + request.getBlockName() + "-" + request.getFlatNo()));

        Guest guest = new Guest();
        guest.setGuestName(request.getGuestName());
        guest.setGuestMobile(request.getGuestMobile());
        guest.setPurpose(request.getPurpose());
        guest.setVisitDate(request.getVisitDate());
        guest.setVisitTime(request.getVisitTime());
        guest.setVehicleNumber(request.getVehicleNumber());
        guest.setStatus(GuestStatus.PENDING);
        guest.setUser(apartment.getUser());

        return guestRepository.save(guest);
    }
}
