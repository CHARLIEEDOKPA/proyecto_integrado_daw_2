package org.iesbelen.veterinario.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.iesbelen.veterinario.dto.IncidenciaDTO;
import org.iesbelen.veterinario.mapper.IncidenciaMapper;
import org.iesbelen.veterinario.model.Duenyo;
import org.iesbelen.veterinario.model.Incidencia;
import org.iesbelen.veterinario.model.Mascota;
import org.iesbelen.veterinario.repo.IncidenciaRepository;
import org.iesbelen.veterinario.requests.IncidenciaRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.validation.Valid;

@Service
public class IncidenciaService {

    @Autowired
    private IncidenciaRepository incidenciaRepository;

    @Autowired
    private MascotaService mascotaService;

    @Autowired
    private IncidenciaMapper incidenciaMapper;

    @Autowired
    private DuenyoService duenyoService;

    public Incidencia saveIncidencia(IncidenciaRequest incidenciaRequest) {
        Mascota mascota = mascotaService.getMascotaById(incidenciaRequest.getId_mascota()).get();
        Incidencia incidencia = new Incidencia();

        incidencia.setId_doctor(mascota.getId_doctor());
        incidencia.setObservaciones(incidenciaRequest.getObservaciones());
        incidencia.setId_mascota(incidenciaRequest.getId_mascota());
        incidencia.prePersist();

        return incidenciaRepository.save(incidencia);
    }

    public List<Incidencia> getListIncidencia() {
        return incidenciaRepository.findAll();
    }

    public List<Incidencia> getListIncidenciaByIdDuenyo(long id) {
        return incidenciaRepository.getListIncidenciaByIdDyenyo(id);
    }

    public boolean modifyIncidencia(Long id, Incidencia incidencia) {
        Optional<Incidencia> opt = incidenciaRepository.findById(id);
        if (opt.isPresent()) {
            boolean equals = id.equals(incidencia.getId());
            if (equals) {
                incidenciaRepository.save(incidencia);
            }
            return equals;
        }
        return false;
    }

    public Optional<Incidencia> getIncidenciaById(long id) {
        return incidenciaRepository.findById(id);
    }

    public boolean deleteIncidencia(long id) {
        Optional<Incidencia> opt = incidenciaRepository.findById(id);
        if (opt.isPresent()) {
            incidenciaRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Incidencia buildIncidencia(@Valid IncidenciaRequest incidenciaRequest, Long id) {
        Optional<Mascota> opt = mascotaService.getMascotaById(incidenciaRequest.getId_mascota());
        if (opt.isPresent()) {
            Mascota mascota = opt.get();
            return !id.equals(mascota.getId_duenyo()) ? null
                    : Incidencia.builder()
                            .id_doctor(mascota.getId_doctor())
                            .id_mascota(mascota.getId())
                            .observaciones(incidenciaRequest.getObservaciones())
                            .build();
        }
        return null;
    }

    public Incidencia addIncidencia(Incidencia incidencia) {
        return incidenciaRepository.save(incidencia);
    }

    public List<Incidencia> getIncidenciaByMascotaAndByDuenyo(Long id_mascota, Long id) {
        Optional<Mascota> opt = mascotaService.getMascotaById(id_mascota);

        if (opt.isPresent()) {
            Mascota mascota = opt.get();
            return id.equals(mascota.getId_duenyo()) ? incidenciaRepository.getListIncidenciaByMascota(id_mascota)
                    : null;
        }

        return null;
    }

    public void readIncidencia(Long id) {
       incidenciaRepository.readIncidencia(id);
    }

    public List<Incidencia> getIncidenciasByDoctor(Long id) {
        return this.incidenciaRepository.getListIncidenciaByDoctor(id);
    }

    public IncidenciaDTO getIncidenciaDTO(Incidencia incidencia) {
       Optional<Duenyo> opt = duenyoService.getDuenyoByIncidenciaId(incidencia.getId_mascota());
       if (opt.isPresent()) {
        Duenyo duenyo = opt.get();
        IncidenciaDTO incidenciaDTO = incidenciaMapper.incidenciaToDTO(incidencia, duenyo, incidencia.getId());
        return incidenciaDTO;
       }
       return null;
    }

    public List<IncidenciaDTO> getListIncidenciaDTO(List<Incidencia> incidencias) {
        List<IncidenciaDTO> incidenciaDTOs =  new ArrayList<>();
        incidencias.forEach(x -> {
          Optional<Duenyo> opt = duenyoService.getDuenyoByIncidenciaId(x.getId());
          if (opt.isPresent()) {
            Duenyo duenyo = opt.get();
            incidenciaDTOs.add(incidenciaMapper.incidenciaToDTO(x, duenyo, x.getId()));
          }  
        });
        return incidenciaDTOs;
    }

}
