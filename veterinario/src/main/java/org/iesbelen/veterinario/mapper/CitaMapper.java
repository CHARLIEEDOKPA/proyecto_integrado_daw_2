package org.iesbelen.veterinario.mapper;

import org.iesbelen.veterinario.dto.CitaDTO;
import org.iesbelen.veterinario.model.Cita;
import org.iesbelen.veterinario.model.Doctor;
import org.iesbelen.veterinario.model.Mascota;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CitaMapper {
    
    @Mapping(source = "doctorIn", target = "doctor")
    @Mapping(source = "mascotaIn", target = "mascota")
    @Mapping(source = "id_doctor", target = "id_doctor")
    @Mapping(source = "id", target = "id")
    public CitaDTO citaToDto(Cita cita,Doctor doctorIn, Mascota mascotaIn, long id_doctor,long id);
}
