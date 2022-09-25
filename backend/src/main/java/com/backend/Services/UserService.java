package com.backend.Services;

import com.backend.DTOs.UserDTO;
import com.backend.Entities.Role;
import com.backend.Entities.User;
import com.backend.Exceptions.ConflictException;
import com.backend.Exceptions.CustomException;
import com.backend.Repositories.UserRepository;
import com.backend.Security.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
    public UserDetails loadUserByUsername(String username) {//throws UsernameNotFoundException {
        try {
            log.info(username);
            User user = userRepo.findByUsername(username);
            if (user == null)
                throw new UsernameNotFoundException("No user found with username: " + username);

            return new org.springframework.security.core.userdetails.User(username,
                    user.getPassword(),
                    user.isEnabled(),
                    true,
                    true,
                    true,
                    getAuthorities(user.getRoles()));
        } catch (final Exception e) {
            throw new RuntimeException(e);
        }
    }

    private Collection<? extends GrantedAuthority> getAuthorities(Collection<Role> roles) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        for (Role role: roles) {
            authorities.add(new SimpleGrantedAuthority(role.name()));
        }
        return authorities;
    }

    /*public static class UserMapper {
        public static UserDTO mapEntityToDTO(User entity) {
            return new UserDTO(entity.getPassword(), entity.getUsername());
        }
        public static User mapDTOToEntity(UserDTO dto) {
            return new User(dto.getPassword(), dto.getUsername());
        }
    }*/

    public boolean existsById(Long id) {
        return userRepo.existsById(id);
    }
    public boolean existsByUserName(String username) {
        return userRepo.existsUserByUsername(username);
    }

    public User insertUser(User user) {
        if (userRepo.existsUserByUsername(user.getUsername()))
            throw new ConflictException("User with name '"+user.getUsername()+"' already exists.");
        else if (userRepo.existsUserByEmail(user.getEmail()))
            throw new ConflictException("User with email '"+user.getEmail()+"' already exists.");
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
    /*
    public User addRoleToUser(Long userId, Long roleId) {
        User user = this.findUserById(userId);
        Role role = roleService.findRoleById(roleId);
        if (!user.hasRole(role)) {
            user.getRoles().add(role);
        } else
            log.info("User {} already has {} role.", user.getUsername(), role.getRoleName());
        return user;
    }*/

    public List<User> getUsers() {
        return userRepo.findAll(); //TODO find per pagination
    }

    public void deleteUserById(Long id) {
        userRepo.deleteById(id);
    }
}
