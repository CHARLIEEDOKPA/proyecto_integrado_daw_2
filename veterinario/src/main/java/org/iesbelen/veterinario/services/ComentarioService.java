package org.iesbelen.veterinario.services;

import java.util.Optional;

import org.iesbelen.veterinario.model.Comentario;
import org.iesbelen.veterinario.model.Duenyo;
import org.iesbelen.veterinario.model.Publicacion;
import org.iesbelen.veterinario.repo.ComentarioRepository;
import org.iesbelen.veterinario.repo.DuenyoRepository;
import org.iesbelen.veterinario.repo.PublicacionRepository;
import org.iesbelen.veterinario.requests.ComentarioRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ComentarioService {

    @Autowired
    private ComentarioRepository comentarioRepository;

    @Autowired
    private PublicacionRepository publicacionRepository;

    @Autowired
    private DuenyoRepository duenyoRepository;

    public Comentario addComentario(Comentario comentario) {
        return comentarioRepository.save(comentario);
    }

    public Comentario buildComentario(ComentarioRequest comentarioRequest, Long id_dyenyo) {
        return Comentario.builder()
            .id_duenyo(id_dyenyo)
            .id_publicacion(comentarioRequest.getId_publicacion())
            .texto(comentarioRequest.getTexto())
            .build();
    }

    public boolean duenyoAndPublicationExists(long id_publicacion, long id_duenyo) {
        Optional<Duenyo> opt_duenyo = duenyoRepository.findById(id_duenyo);
        Optional<Publicacion> opt_publicacion =  publicacionRepository.findById(id_publicacion);

        return opt_duenyo.isPresent() && opt_publicacion.isPresent();
    }

}
