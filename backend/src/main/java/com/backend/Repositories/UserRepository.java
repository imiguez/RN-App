package com.backend.Repositories;

import com.backend.Entities.Role;
import com.backend.Entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByUserName(String userName);
    boolean existsUserByUserName(String userName);
    boolean existsUserByEmail(String email);

}
