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
public class MascotaRequest {
    
    @NotBlank
    private String nombre;
    @NotNull
    private Date nacimiento;
    @NotBlank
    private String sexo;
    @NotNull
    private long id_duenyo;
    private String foto;
    @NotBlank
    private String raza;

}
