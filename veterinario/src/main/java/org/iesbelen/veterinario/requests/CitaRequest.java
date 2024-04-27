package org.iesbelen.veterinario.requests;

import java.sql.Date;
import java.sql.Time;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CitaRequest {
    @NotNull
    private String rol;

    private Date date;

    private Time time;

    private long id_mascota;
}
