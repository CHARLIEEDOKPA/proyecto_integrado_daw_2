package org.iesbelen.veterinario.services;

import org.iesbelen.veterinario.model.MeGusta;
import org.iesbelen.veterinario.repo.MeGustaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MeGustaService {
    
    @Autowired
    private MeGustaRepository meGustaRepository;

    public MeGusta addMeGusta(MeGusta meGusta) {
        return meGustaRepository.save(meGusta);
    }

    public void deleteMeGusta(Long id_duenyo, Long id_publicacion) {
        meGustaRepository.noMeGusta(id_duenyo, id_publicacion);
    }

    public MeGusta buildMeGusta(Long id_duenyo, Long id_publicacion) {
        return MeGusta.builder()
        .id_duenyo(id_duenyo)
        .id_publicacion(id_publicacion)
        .build();
    }

}
