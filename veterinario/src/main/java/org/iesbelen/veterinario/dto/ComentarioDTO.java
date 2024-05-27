package org.iesbelen.veterinario.dto;

import org.iesbelen.veterinario.model.Duenyo;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ComentarioDTO {

    private long id;


    private String texto;

    @JsonIgnore
    private Long id_duenyo;

    private Duenyo duenyo;
}

