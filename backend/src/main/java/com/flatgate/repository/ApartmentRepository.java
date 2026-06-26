package com.flatgate.repository;

import com.flatgate.entity.Apartment;
import com.flatgate.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ApartmentRepository
        extends JpaRepository<Apartment, Long> {

    Optional<Apartment> findByUser(User user);

    Optional<Apartment> findByBlockNameAndFlatNo(String blockName, String flatNo);

}