package org.iesbelen.veterinario.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.iesbelen.veterinario.dto.PublicacionDTO;
import org.iesbelen.veterinario.mapper.PublicacionMapper;
import org.iesbelen.veterinario.model.Duenyo;
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

    @Autowired
    private DuenyoService duenyoService;

    @Autowired
    private PublicacionMapper publicacionMapper;

    @Autowired
    private ComentarioService comentarioService;


    public List<Publicacion> getPublicacionesByDuenyo(Long id) {
        return publicacionRepository.getPublicacionesByIdDuenyo(id);
    }

    public Publicacion addPublicacion(Publicacion publicacion, Long id_duenyo) {
        publicacion.setActivo(true);
        publicacion.setId_duenyo(id_duenyo);
        return publicacionRepository.save(publicacion);
    }

    public Optional<Publicacion> getPublicacionById(Long id) {
        return publicacionRepository.findById(id);
    }

    public void deletePublicacionesByDuenyo(long id) {
        publicacionRepository.deletePublicacionesByDuenyo(id);
    }

    public List<PublicacionDTO> getListDTO(List<Publicacion> publicaciones) {
        List<PublicacionDTO> publicacionDTOs = new ArrayList<>();
        publicaciones.forEach(p -> {
            PublicacionDTO publicacionDTO = getPublicacionDTO(p);
            if (publicacionDTO != null) {
                publicacionDTOs.add(publicacionDTO);
            }
        });
        return publicacionDTOs;
    }

    public PublicacionDTO getPublicacionDTO(Publicacion publicacion) {
        Optional<Duenyo> opt_duenyo = duenyoService.getDuenyoById(publicacion.getId_duenyo());
        if (opt_duenyo.isPresent()) {
            Duenyo duenyo = opt_duenyo.get();
            PublicacionDTO publicacionDTO = publicacionMapper.publicacionToDTO(publicacion, duenyo, true, publicacion.getMegustas(), publicacion.getId(), publicacion.getComentarios());
            publicacionDTO.setComentarioDTOs(comentarioService.getListComentariosDTOs(publicacion.getComentarios()));
            return publicacionDTO;
        }
        return null;
    }
}