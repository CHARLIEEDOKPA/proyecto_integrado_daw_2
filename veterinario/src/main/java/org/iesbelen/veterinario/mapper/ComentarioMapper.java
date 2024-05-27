package org.iesbelen.veterinario.mapper;

import org.iesbelen.veterinario.dto.ComentarioDTO;
import org.iesbelen.veterinario.model.Comentario;
import org.iesbelen.veterinario.model.Duenyo;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ComentarioMapper {
    
    @Mapping(source = "duenyo",target = "duenyo")
    @Mapping(source = "id",target = "id")
    public ComentarioDTO comentarioToDTO(Comentario comentario, Duenyo duenyo,long id);

}
