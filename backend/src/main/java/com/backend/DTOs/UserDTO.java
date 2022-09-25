package com.backend.DTOs;

import lombok.Data;// Is like having implicit @Getter, @Setter, @ToString, @EqualsAndHashCode and @RequiredArgsConstructor
import lombok.NoArgsConstructor;
import lombok.NonNull;// makes the attributes appeares in the constructor

@Data @NoArgsConstructor
public class UserDTO {
    private String username;
    private String password;

}
