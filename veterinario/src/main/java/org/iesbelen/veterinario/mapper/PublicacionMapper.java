package org.iesbelen.veterinario.mapper;

import java.util.List;

import org.iesbelen.veterinario.dto.PublicacionDTO;
import org.iesbelen.veterinario.model.Comentario;
import org.iesbelen.veterinario.model.Duenyo;
import org.iesbelen.veterinario.model.MeGusta;
import org.iesbelen.veterinario.model.Publicacion;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PublicacionMapper {
    
    @Mapping(target = "duenyo",source = "duenyo")
    @Mapping(target = "activo",source = "activoIn")
    @Mapping(target = "megustas", source = "meGustas")
    @Mapping(target = "id", source = "id")
    @Mapping(target = "comentarios", source = "comentarios")
    public PublicacionDTO publicacionToDTO(Publicacion publicacion,Duenyo duenyo, boolean activoIn,List<MeGusta> meGustas,long id,List<Comentario> comentarios);

}
