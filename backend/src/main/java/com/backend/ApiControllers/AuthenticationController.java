package com.backend.ApiControllers;


import com.backend.DTOs.AuthCredentialsDTO;
import com.backend.Entities.Role;
import com.backend.Entities.User;
import com.backend.Security.JwtUtil;
import com.backend.Services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;

@Controller @Slf4j @RequestMapping("/api")
class AuthenticationController {

    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private BCryptPasswordEncoder encoder;

    @PostMapping(path = "/login",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> login(@RequestBody AuthCredentialsDTO user) {
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
        Authentication auth = authenticationManager.authenticate(token);
        User authUser = (User) auth.getPrincipal();
        String jwt = jwtUtil.generateJwtToken(authUser);
        return ResponseEntity.ok().header("Authorization", jwt).body(jwt);
    }

    @PostMapping(path = "/sign-up",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> registerUser(@Valid @RequestBody User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        user.addRole(Role.ROLE_USER); // All new users by default has the user role
        userService.insertUser(user);
        String jwt = jwtUtil.generateJwtToken(user);

        return ResponseEntity.status(HttpStatus.CREATED).body(jwt);
    }

    // TODO
    @GetMapping("/logout")
    public ResponseEntity<String> logout() {
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok().body("logout ");
    }
}
