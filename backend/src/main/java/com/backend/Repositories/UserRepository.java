package com.backend.Repositories;

import com.backend.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    Optional<Boolean> existsUserByUsername(String username);
    Optional<Boolean> existsUserByEmail(String email);


}

