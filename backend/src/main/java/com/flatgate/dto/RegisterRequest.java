package com.flatgate.dto;

import com.flatgate.enums.Role;
import lombok.Data;

@Data
public class RegisterRequest {

    private String name;
    private String email;
    private String mobile;
    private String password;

    private String blockName;
    private String flatNo;

    private Role role;
}