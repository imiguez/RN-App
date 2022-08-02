package com.backend.Services;

import com.backend.Entities.Role;
import com.backend.Repositories.RoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service @Slf4j
public class RoleService {
    @Autowired
    private RoleRepository roleRepo;


    @Transactional
    public void saveRole(Role role) {
        roleRepo.save(role);
    }
    @Transactional
    public Role getRole(Long id) {
        return roleRepo.findById(id).orElseThrow(); //TODO customize Exception
    }
    @Transactional
    public List<Role> getRoles() {
        return roleRepo.findAll();
    }
}
