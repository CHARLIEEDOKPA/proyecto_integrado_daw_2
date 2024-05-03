package org.iesbelen.veterinario.model;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserPassword {
    
    @NotBlank
    private String email;
    @NotBlank
    private String contrasenya;

}
