package org.iesbelen.veterinario.services;

import java.util.List;
import java.util.Optional;

import org.iesbelen.veterinario.model.Credenciales;
import org.iesbelen.veterinario.model.Mascota;
import org.iesbelen.veterinario.model.Recomendacion;
import org.iesbelen.veterinario.repo.RecomendacionRepository;
import org.iesbelen.veterinario.requests.RecomendacionRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import jakarta.validation.Valid;

@Service
public class RecomendacionService {

    @Autowired
    private RecomendacionRepository recomendacionRepository;

    @Autowired
    private MascotaService mascotaService;

    synchronized public Recomendacion saveRecomendación(RecomendacionRequest recomendacionRequest,
            Credenciales credenciales) {

        Recomendacion recomendacion = new Recomendacion();
        recomendacion.setId_doctor(credenciales.getId_doctor_duenyo());
        recomendacion.setSobre(recomendacionRequest.getSobre());
        recomendacion.setTexto(recomendacionRequest.getTexto());
        recomendacion.setId_mascota(recomendacionRequest.getId_mascota());
        Recomendacion newRecomendacion;
        try {
            newRecomendacion = recomendacionRepository.save(recomendacion);

        } catch (DataIntegrityViolationException e) {
            return null;
        }

        return newRecomendacion;

    }

    synchronized public Recomendacion addRecomendacion(Recomendacion recomendacion) {
        return recomendacionRepository.save(recomendacion);
    }

    public Optional<Recomendacion> getRecomendacionById(long id) {
        return recomendacionRepository.findById(id);
    }

    public Recomendacion buildRecomendacion(@Valid RecomendacionRequest recomendacionRequest, Long id) {
        Optional<Mascota> opt = mascotaService.getMascotaById(recomendacionRequest.getId_mascota());

        if (opt.isPresent()) {
            Mascota mascota = opt.get();
            return !id.equals(mascota.getId_doctor()) ? null
                    : Recomendacion.builder()
                            .id_doctor(id)
                            .id_mascota(recomendacionRequest.getId_mascota())
                            .sobre(recomendacionRequest.getSobre())
                            .texto(recomendacionRequest.getTexto())
                            .build();
        }

        return null;

    }

    public List<Recomendacion> getRecomendacionesByDuenyo(Long id) {
       return recomendacionRepository.getRecomendacionesByDuenyo(id);
    }

    public void readRecomendacion(Long id_recomendacion) {
        this.recomendacionRepository.readRecomendacion(id_recomendacion);
    }

}
