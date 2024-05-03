package org.iesbelen.veterinario.requests;

import java.sql.Date;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class DuenyoEditRequest {

    @NotNull
    private long id;

    @NotBlank
    private String nombre;

    @NotBlank
    private String apellidos1;

    @NotBlank
    private String apellidos2;

    @NotBlank

    private String residencia;

    @NotNull
    private Date nacimiento;

    @NotBlank
    private String email;
    
    @NotBlank
    private String telefono;
}
