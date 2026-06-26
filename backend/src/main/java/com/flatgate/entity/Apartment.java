package com.flatgate.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "apartments")
@Data
public class Apartment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String blockName;

    private String flatNo;

    private String ownerName;

    private String ownerMobile;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}