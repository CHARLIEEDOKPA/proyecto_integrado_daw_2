package org.iesbelen.veterinario.requests;

import java.sql.Date;
import java.sql.Time;

import org.iesbelen.veterinario.config.SqlTimeDeserializer;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CitaRequest {

    private Date date;

    @JsonDeserialize(using = SqlTimeDeserializer.class)
    private Time time;

    private long id_mascota;
}
