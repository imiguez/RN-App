package com.backend.ApiControllers;

import com.backend.DTOs.UserDTO;
import com.backend.Entities.User;
import com.backend.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("")
    public ResponseEntity<List<UserDTO>> getUsers() {
        List<User> users = this.userService.getUsers();
        return ResponseEntity.ok().body(users.stream().map(user -> new UserDTO(user)).collect(Collectors.toList()));
    }

    @Secured("ROLE_USER")
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable("id") Long id) {
        UserDTO userDTO = new UserDTO(userService.findUserById(id));
        return ResponseEntity.ok().body(userDTO);
    }

    @Secured("ROLE_ADMIN")
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable("id") Long id) {
        userService.deleteUserById(id);
    }
}
