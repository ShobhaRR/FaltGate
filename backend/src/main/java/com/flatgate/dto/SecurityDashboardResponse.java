package com.flatgate.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SecurityDashboardResponse {

    private long todayVisitors;
    private long checkedIn;
    private long expectedVisitors;

}
