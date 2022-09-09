package com.backend.Controllers;

import com.backend.Entities.Role;
import com.backend.Services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class RoleController {

    @Autowired
    private RoleService roleService;

    @GetMapping("/role/{id}")
    public ResponseEntity<Role> getRoleById(@PathVariable("id") Long id) {
        return ResponseEntity.ok().body(roleService.findRoleById(id));
    }

    @PostMapping(path = "/role", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Role> insertRole(@RequestBody Role role) {
        return ResponseEntity.ok().body(roleService.insertRole(role));
    }

}
