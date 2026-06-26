package com.flatgate.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.flatgate.enums.GuestStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "guests")
@Data
public class Guest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String guestName;

    private String guestMobile;

    private String purpose;

    private LocalDate visitDate;

    private LocalTime visitTime;

    private String vehicleNumber;

    @Enumerated(EnumType.STRING)
    private GuestStatus status;

    private LocalDateTime checkinTime;

    private LocalDateTime checkoutTime;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}