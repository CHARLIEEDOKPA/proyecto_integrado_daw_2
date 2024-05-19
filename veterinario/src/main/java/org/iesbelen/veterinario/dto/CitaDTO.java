package org.iesbelen.veterinario.dto;

import java.sql.Date;
import java.sql.Time;

import org.iesbelen.veterinario.model.Doctor;
import org.iesbelen.veterinario.model.Mascota;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CitaDTO {
    private long id;
    private Date date;
    private Time time;
    private long id_mascota;
    private long id_doctor;
    private Mascota mascota;
    private Doctor doctor;

}
