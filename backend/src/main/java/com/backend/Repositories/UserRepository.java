package com.backend.Repositories;

import com.backend.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);
    boolean existsUserByUsername(String username);
    boolean existsUserByEmail(String email);

}

