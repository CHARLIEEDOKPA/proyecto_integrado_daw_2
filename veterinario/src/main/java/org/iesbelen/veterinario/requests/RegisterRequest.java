package org.iesbelen.veterinario.requests;

import java.sql.Date;

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
    private String email;
    private String residencia;
    private String telefono;
    private Date nacimiento;
    private String foto;

}
