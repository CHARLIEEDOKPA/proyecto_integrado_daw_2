package org.iesbelen.veterinario.dto;

import java.time.LocalDateTime;

import org.iesbelen.veterinario.model.Doctor;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecomendacionDTO {
    

    private long id;
    private String sobre;
    private LocalDateTime fecha;
    private String texto;

    private long id_mascota;
    private long id_doctor;
    private boolean leido;

    private Doctor doctor;


}
