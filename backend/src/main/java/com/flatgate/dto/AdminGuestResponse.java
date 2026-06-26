package com.flatgate.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class AdminGuestResponse {

    private Long id;
    private String guestName;
    private String guestMobile;
    private String blockName;
    private String flatNo;
    private String purpose;
    private LocalDate visitDate;
    private String status;
}
