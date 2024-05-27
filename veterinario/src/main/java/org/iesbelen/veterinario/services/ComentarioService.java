package org.iesbelen.veterinario.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.iesbelen.veterinario.dto.ComentarioDTO;
import org.iesbelen.veterinario.mapper.ComentarioMapper;
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
    private ComentarioMapper comentarioMapper;

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

    public List<ComentarioDTO> getListComentariosDTOs(List<Comentario> comentarios) {
        List<ComentarioDTO> comentarioDTOs = new ArrayList<>();
        comentarios.forEach(c -> {
            ComentarioDTO comentarioDTO = getComentarioDTO(c);
            if (comentarioDTO != null) {
                comentarioDTOs.add(comentarioDTO);
            }
        });
        return comentarioDTOs;
    }

    public ComentarioDTO getComentarioDTO(Comentario comentario) {
        Optional<Duenyo> opt_duenyo = duenyoRepository.findById(comentario.getId_duenyo());
        if (opt_duenyo.isPresent()) {
            Duenyo duenyo = opt_duenyo.get();
            return comentarioMapper.comentarioToDTO(comentario, duenyo, comentario.getId());
        }
        return null;
    }

}
