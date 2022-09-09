package com.backend.Entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity @Table(name = "user") @Data //@JsonIgnoreProperties("hibernateLazyInitializer")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) @Column(updatable = false)
    private Long id;
    @Column(name = "user_name", unique = true, nullable = false)
    private String userName;
    @Column(unique = true, nullable = false, updatable = false)
    private String email;
    @Column(nullable = false)
    private String password;
    @Enumerated
    private Gender gender;
    @ManyToMany()
    @JoinTable(name = "users_role",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private List<Role> roles = new ArrayList<>();
    @Column(name = "creation_date", nullable = false, updatable = false)
    private Date creationDate;

    public User() {}

    public User(Long id, String userName) {
        this.id = id;
        this.userName = userName;
    }

    public Boolean hasRole(Role role) {
        return this.roles.contains(role);
    }


}
