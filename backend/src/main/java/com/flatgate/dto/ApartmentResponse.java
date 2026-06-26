package com.flatgate.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApartmentResponse {

    private Long id;
    private String name;
    private String blockName;
    private String flatNo;
    private String mobile;
    private String email;
    private boolean active;
}
