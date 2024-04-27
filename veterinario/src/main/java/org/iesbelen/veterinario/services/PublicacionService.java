package org.iesbelen.veterinario.services;

import java.util.List;
import java.util.Optional;

import org.iesbelen.veterinario.model.Publicacion;
import org.iesbelen.veterinario.repo.PublicacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * PublicacionService
 */
@Service
public class PublicacionService {

    @Autowired
    private PublicacionRepository publicacionRepository;


    public List<Publicacion> getPublicacionesByDuenyo(Long id) {
        return publicacionRepository.getPublicacionesByIdDuenyo(id);
    }

    public Publicacion addPublicacion(Publicacion publicacion) {
        return publicacionRepository.save(publicacion);
    }

    public Optional<Publicacion> getPublicacionById(Long id) {
        return publicacionRepository.findById(id);
    }

    public void deletePublicacionesByDuenyo(long id) {
        publicacionRepository.deletePublicacionesByDuenyo(id);
    }
}