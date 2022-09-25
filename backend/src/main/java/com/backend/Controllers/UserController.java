package com.backend.Controllers;

import com.backend.Entities.User;
import com.backend.Security.JwtUtil;
import com.backend.Services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok().body(userService.getUsers());
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUser(@PathVariable("id") Long id) {
        return ResponseEntity.ok().body(userService.findUserById(id));
    }


/*
    @GetMapping(path = "/user/{userId}/add-role/{roleId}")
    public ResponseEntity<User> editUser(@PathVariable("userId") Long userId, @PathVariable("roleId") Long roleId) {
        return ResponseEntity.ok().body(userService.addRoleToUser(userId, roleId));
    }
*/
    @DeleteMapping(path = "/admin/user/{id}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable("id") Long id) {
        userService.deleteUserById(id);
        return ResponseEntity.ok(Boolean.TRUE);
    }

}
