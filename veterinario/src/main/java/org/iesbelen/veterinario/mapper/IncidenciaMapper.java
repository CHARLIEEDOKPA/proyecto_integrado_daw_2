package org.iesbelen.veterinario.mapper;

import org.iesbelen.veterinario.dto.IncidenciaDTO;
import org.iesbelen.veterinario.model.Duenyo;
import org.iesbelen.veterinario.model.Incidencia;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "Spring")
public interface IncidenciaMapper {

    @Mapping(target = "duenyo", source = "duenyoIn")
    @Mapping(target = "id", source =  "id")
    public IncidenciaDTO incidenciaToDTO(Incidencia incidencia,Duenyo duenyoIn, long id);
    
}
