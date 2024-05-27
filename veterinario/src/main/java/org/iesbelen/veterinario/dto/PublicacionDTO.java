package org.iesbelen.veterinario.dto;

import java.util.List;

import org.iesbelen.veterinario.model.Comentario;
import org.iesbelen.veterinario.model.Duenyo;
import org.iesbelen.veterinario.model.MeGusta;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PublicacionDTO {

    private long id;


    private String photo_url;


    private String descripcion;

    @JsonIgnore
    private long id_duenyo;

    private List<MeGusta> megustas;

    @JsonIgnore
    private List<Comentario> comentarios;
    @JsonIgnore
    private boolean activo;

    private Duenyo duenyo;

    private List<ComentarioDTO> comentarioDTOs;



}
