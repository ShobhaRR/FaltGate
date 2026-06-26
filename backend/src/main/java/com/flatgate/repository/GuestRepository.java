package com.flatgate.repository;

import com.flatgate.entity.Guest;
import com.flatgate.entity.User;
import com.flatgate.enums.GuestStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface GuestRepository extends JpaRepository<Guest, Long> {

    List<Guest> findByVisitDate(LocalDate visitDate);

    List<Guest> findByUser(User user);

    long countByUser(User user);

    long countByUserAndVisitDate(User user, LocalDate date);

    long countByUserAndStatus(User user, GuestStatus status);

    long countByVisitDate(LocalDate date);

    long countByVisitDateAndStatus(LocalDate date, GuestStatus status);

}