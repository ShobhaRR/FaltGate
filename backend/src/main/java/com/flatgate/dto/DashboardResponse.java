package com.flatgate.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardResponse {

    private long totalGuests;
    private long todayGuests;
    private long checkedIn;

}
