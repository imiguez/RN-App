package com.backend.Entities;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.*;

@Entity @Table(name = "users") @Data
public class User implements UserDetails {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) @Column(updatable = false)
    private Long id;

    @NotEmpty @Size(min = 4, max = 25, message = "The username must have between 4 and 25 characters.")
    @Column(unique = true,
        columnDefinition = "VARCHAR(25) not null, CONSTRAINT CHK_username CHECK(LENGTH(username) >= 4 AND LENGTH(username) < 25)")
    private String username;

    @NotEmpty @Email
    @Column(unique = true, nullable = false, updatable = false)
    private String email;

    @NotEmpty @Size(min = 8, message = "The password must have at least 8 characters.")
    @Column(nullable = false)
    private String password;
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @ElementCollection(targetClass = Role.class, fetch = FetchType.EAGER)
    @JoinTable(name = "users_roles", joinColumns = @JoinColumn(name = "id"))
    @Column(name = "roles", nullable = false)
    @Enumerated(EnumType.STRING)
    private Set<Role> roles = new HashSet<>();

    @Column(name = "creation_date", nullable = false, updatable = false)
    private Date creationDate;

    public User() {}

    public User(Long id, String username) {
        this.id = id;
        this.username = username;
    }

    public User(String email) {
        this.email = email;
    }

    public boolean addRole(Role role) {
        return this.roles.add(role);
    }

    public boolean hasRole(Role role) {
        return this.roles.contains(role);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
        this.roles.forEach(role -> {
            grantedAuthorities.add(new SimpleGrantedAuthority(role.name()));
        });
        return grantedAuthorities;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
