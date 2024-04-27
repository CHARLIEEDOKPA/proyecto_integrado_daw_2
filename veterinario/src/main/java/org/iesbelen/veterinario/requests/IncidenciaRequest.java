package org.iesbelen.veterinario.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class IncidenciaRequest {


    @NotNull
    private Long id_mascota;

    @NotBlank
    @NotNull
    private String observaciones;

    @NotNull(message = "El rol no tiene que estar")
    @NotBlank
    private String rol;
}
