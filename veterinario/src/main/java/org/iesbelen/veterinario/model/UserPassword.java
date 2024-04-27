package org.iesbelen.veterinario.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserPassword {
    
    private String email;
    private String contrasenya;

}
