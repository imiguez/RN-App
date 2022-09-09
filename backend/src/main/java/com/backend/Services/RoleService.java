package com.backend.Services;

import com.backend.Entities.Role;
import com.backend.Exceptions.ConflictException;
import com.backend.Repositories.RoleRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service @Slf4j
public class RoleService {
    @Autowired
    private RoleRepository roleRepo;


    @Transactional
    public Role insertRole(Role role) {
        if (roleRepo.existsRoleByRoleName(role.getRoleName()))
            throw new ConflictException("Tag with name '"+role.getRoleName()+"' already exists.");
        role.setCreationDate(new Date());
        return roleRepo.save(role);
    }
    @Transactional
    public Role findRoleById(Long id) {
        return roleRepo.findById(id).orElseThrow(); //TODO customize Exception
    }
    @Transactional
    public List<Role> findRoles() {
        return roleRepo.findAll();
    }
}
