package com.flatgate.service;

import com.flatgate.dto.ProfileRequest;
import com.flatgate.dto.ProfileResponse;
import com.flatgate.entity.Apartment;
import com.flatgate.entity.User;
import com.flatgate.repository.ApartmentRepository;
import com.flatgate.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final UserRepository userRepository;
    private final ApartmentRepository apartmentRepository;

    public ProfileResponse getProfile(String email) {

        User user = userRepository.findByEmail(email).orElseThrow();
        Apartment apartment = apartmentRepository.findByUser(user).orElse(null);

        return new ProfileResponse(
                user.getName(),
                user.getEmail(),
                user.getMobile(),
                apartment != null ? apartment.getBlockName() : "",
                apartment != null ? apartment.getFlatNo() : ""
        );
    }

    public ProfileResponse updateProfile(String email, ProfileRequest request) {

        User user = userRepository.findByEmail(email).orElseThrow();

        user.setName(request.getName());
        user.setMobile(request.getMobile());
        userRepository.save(user);

        Apartment apartment = apartmentRepository.findByUser(user).orElse(null);

        if (apartment != null) {
            apartment.setBlockName(request.getBlockName());
            apartment.setFlatNo(request.getFlatNo());
            apartment.setOwnerName(request.getName());
            apartment.setOwnerMobile(request.getMobile());
            apartmentRepository.save(apartment);
        }

        return getProfile(email);
    }

}
