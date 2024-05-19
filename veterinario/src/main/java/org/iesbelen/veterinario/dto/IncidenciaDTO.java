package org.iesbelen.veterinario.dto;

import java.time.LocalDateTime;

import org.iesbelen.veterinario.model.Duenyo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IncidenciaDTO {

private long id;
    private boolean leido;
    private long id_doctor;
    private long id_mascota;
    private String observaciones;
    private LocalDateTime fecha;

    private Duenyo duenyo;

}
