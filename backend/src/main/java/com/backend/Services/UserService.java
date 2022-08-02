package com.backend.Services;

import com.backend.Entities.Role;
import com.backend.Entities.User;
import com.backend.Repositories.RoleRepository;
import com.backend.Repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service @Slf4j
public class UserService {
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private RoleRepository roleRepo;

    @Transactional
    public User saveUser(User user) {
        User res = userRepo.save(user);
        if (res != null) log.info("User {} was created succesfully.", res.getUserName());
        else log.info("Error while creating user."); //TODO customize Exception
        return res;
    }

    @Transactional
    public User findUserById(Long id) {
        return userRepo.findById(id).orElseThrow(); //TODO customize Exception
    }
    @Transactional
    public void addRoleToUser(Long userId, Long roleId) {
        User user = this.findUserById(userId);
        Role role = roleRepo.findById(roleId).orElseThrow(); //TODO customize Exception
        if (!user.hasRole(role)) {
            user.getRoles().add(role);
            log.info("User {} has now {} role.", user.getUserName(), role.getRoleName());
        } else
            log.info("User {} already has {} role.", user.getUserName(), role.getRoleName());
    }
    @Transactional
    public List<User> getUsers() {
        return userRepo.findAll(); //TODO find per pagination
    }
}
