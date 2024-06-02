package org.iesbelen.veterinario.requests;

import java.sql.Date;

import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {

    private String nombre;
    private String apellidos1;
    private String apellidos2;
    @Email
    private String email;
    private String residencia;
    private String telefono;
    private Date nacimiento;
    private String foto;

}
