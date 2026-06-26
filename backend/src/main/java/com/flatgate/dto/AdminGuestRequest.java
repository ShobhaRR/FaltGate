package com.flatgate.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class AdminGuestRequest {

    private String blockName;
    private String flatNo;
    private String guestName;
    private String guestMobile;
    private String purpose;
    private LocalDate visitDate;
    private LocalTime visitTime;
    private String vehicleNumber;
}
