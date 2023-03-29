package com.backend.DTOs;

import com.backend.Entities.Gender;
import com.backend.Entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;// Is like having implicit @Getter, @Setter, @ToString, @EqualsAndHashCode and @RequiredArgsConstructor
import lombok.NoArgsConstructor;
import lombok.NonNull;// makes the attributes appeares in the constructor

import java.util.Date;

@Data @NoArgsConstructor @AllArgsConstructor
public class UserDTO {

    private Long id;
    private String username;
    private String email;
    private Gender gender;
    private Date creationDate;

    public UserDTO(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.gender = user.getGender();
        this.creationDate = user.getCreationDate();
    }
}
