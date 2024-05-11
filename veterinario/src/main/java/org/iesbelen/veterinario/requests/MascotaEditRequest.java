package org.iesbelen.veterinario.requests;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MascotaEditRequest {


    @NotNull
    private long id;

    @NotBlank
    private String nombre;

    @NotNull
    private Date nacimiento;

    @NotBlank
    private String sexo;

    @NotBlank
    private String foto;

    @NotBlank
    private String raza;
    
}