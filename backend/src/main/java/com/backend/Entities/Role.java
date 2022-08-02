package com.backend.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity @Table(name = "role") @Data @NoArgsConstructor @AllArgsConstructor
public class Role {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "role_name", unique = true, nullable = false)
    private String roleName;

}
