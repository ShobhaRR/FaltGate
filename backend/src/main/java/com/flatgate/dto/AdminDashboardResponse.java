package com.flatgate.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminDashboardResponse {

    private long totalApartments;
    private long totalGuests;
    private long todayVisitors;
    private long pendingVisitors;
}
