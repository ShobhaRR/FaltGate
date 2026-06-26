package com.flatgate.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProfileResponse {

    private String name;
    private String email;
    private String mobile;
    private String blockName;
    private String flatNo;

}
