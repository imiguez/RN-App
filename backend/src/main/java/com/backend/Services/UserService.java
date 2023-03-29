package com.backend.Services;

import com.backend.Entities.Role;
import com.backend.Entities.User;
import com.backend.Exceptions.ConflictException;
import com.backend.Exceptions.CustomException;
import com.backend.Repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Service @Slf4j @Transactional
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepo;

    @Override
    public User loadUserByUsername(String email) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("No user found with email: " + email));
        return user;
    }

    private Collection<? extends GrantedAuthority> getAuthorities(Collection<Role> roles) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        for (Role role: roles) {
            authorities.add(new SimpleGrantedAuthority(role.name()));
        }
        return authorities;
    }

    public boolean existsById(Long id) {
        return userRepo.existsById(id);
    }

    public User insertUser(User user) {
        userRepo.existsUserByUsername(user.getUsername()).orElseThrow(
                () -> new ConflictException("User with name '"+user.getUsername()+"' already exists."));
        userRepo.existsUserByEmail(user.getEmail()).orElseThrow(
                () -> new ConflictException("User with email '"+user.getEmail()+"' already exists.")
        );
        user.setCreationDate(new Date());
        userRepo.save(user);
        return user;
    }

    public User findUserById(Long id) {
        User user = userRepo.findById(id).orElseThrow(() -> new CustomException(
                "The user with the id: "+id.toString()+" doesn´t exists.", HttpStatus.NOT_FOUND
        ));
        return user;
    }

    public List<User> getUsers() {
        return userRepo.findAll(); //TODO find per pagination
    }

    public void deleteUserById(Long id) {
        userRepo.deleteById(id);
    }
}
