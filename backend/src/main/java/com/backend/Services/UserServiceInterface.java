package com.backend.Services;

import com.backend.Entities.User;

import java.util.List;

public interface UserServiceInterface {
    User saveUser(User user);
    User findUserByName(String userName);
    User findUserById(Long id);
    void addRoleToUser(Long userId, Long roleId);
    List<User> getUsers();

}
