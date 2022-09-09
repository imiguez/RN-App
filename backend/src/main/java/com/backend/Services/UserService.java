package com.backend.Services;

import com.backend.DTOs.UserDTO;
import com.backend.Entities.Role;
import com.backend.Entities.User;
import com.backend.Exceptions.ConflictException;
import com.backend.Exceptions.CustomException;
import com.backend.Repositories.RoleRepository;
import com.backend.Repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service @Slf4j
public class UserService {
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private RoleService roleService;

    public static class UserMapper {
        public static UserDTO mapEntityToDTO(User entity) {
            return new UserDTO(entity.getId(), entity.getUserName());
        }
        public static User mapDTOToEntity(UserDTO dto) {
            return new User(dto.getId(), dto.getUserName());
        }
    }

    @Transactional
    public boolean existsById(Long id) {
        return userRepo.existsById(id);
    }
    @Transactional
    public boolean existsByUserName(String username) {
        return userRepo.existsUserByUserName(username);
    }

    @Transactional
    public User insertUser(User user) {
        if (userRepo.existsUserByUserName(user.getUserName()))
            throw new ConflictException("User with name '"+user.getUserName()+"' already exists.");
        else if (userRepo.existsUserByEmail(user.getEmail()))
            throw new ConflictException("User with email '"+user.getEmail()+"' already exists.");
        user.setCreationDate(new Date());
        return userRepo.save(user);
    }

    @Transactional
    public User findUserById(Long id) {
        User user = userRepo.findById(id).orElseThrow(() -> new CustomException(
                "The user with the id: "+id.toString()+" doesn´t exists.", HttpStatus.NOT_FOUND
        ));
        return user;
    }
    @Transactional
    public User addRoleToUser(Long userId, Long roleId) {
        User user = this.findUserById(userId);
        Role role = roleService.findRoleById(roleId);
        if (!user.hasRole(role)) {
            user.getRoles().add(role);
        } else
            log.info("User {} already has {} role.", user.getUserName(), role.getRoleName());
        return user;
    }
    @Transactional
    public List<User> getUsers() {
        return userRepo.findAll(); //TODO find per pagination
    }

    @Transactional
    public void deleteUserById(Long id) {
        userRepo.deleteById(id);
    }
}
