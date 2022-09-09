package com.backend.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NonNull;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity @Table(name = "role") @Data
public class Role {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "role_name", unique = true, nullable = false)
    private String roleName;
    @Column(name = "creation_date", nullable = false, updatable = false)
    private Date creationDate;
    @JsonIgnore
    @ManyToMany(mappedBy = "roles")
    private List<User> users;

}
