package org.iesbelen.veterinario.mapper;

import org.iesbelen.veterinario.dto.RecomendacionDTO;
import org.iesbelen.veterinario.model.Doctor;
import org.iesbelen.veterinario.model.Recomendacion;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RecomendacionMapper {

    @Mapping(source = "id", target = "id")
    @Mapping(target = "doctor", source = "doctorIn")
    public RecomendacionDTO recomendacionToDTO( Doctor doctorIn,Recomendacion recomendacion,long id);
    
}
