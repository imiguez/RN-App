package com.backend.DTOs;

import lombok.Data;// Is like having implicit @Getter, @Setter, @ToString, @EqualsAndHashCode and @RequiredArgsConstructor
import lombok.NonNull;// makes the attributes appeares in the constructor

@Data
public class UserDTO {
    @NonNull
    private Long id;
    @NonNull
    private String userName;

}
