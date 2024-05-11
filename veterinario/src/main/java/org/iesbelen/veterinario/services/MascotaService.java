package org.iesbelen.veterinario.services;

import java.util.List;
import java.util.Optional;

import org.iesbelen.veterinario.model.Doctor;
import org.iesbelen.veterinario.model.Duenyo;
import org.iesbelen.veterinario.model.Mascota;
import org.iesbelen.veterinario.repo.MascotaRepository;
import org.iesbelen.veterinario.requests.MascotaEditRequest;
import org.iesbelen.veterinario.requests.MascotaRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.validation.Valid;

@Service
public class MascotaService {
    
    @Autowired
     private MascotaRepository mascotaRepository;

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private DuenyoService duenyoService;


     public Mascota addMascota(Mascota mascota) {
        return mascotaRepository.save(mascota);    
     }

     public void deleteMascota(long id) {
        mascotaRepository.deleteMascota(id);
     }

     public List<Mascota> getMascotas() {
        return mascotaRepository.getAllActiveMascotas();
     }

     public Optional<Mascota> getMascotaById(long id) {
      return mascotaRepository.getMascotaById(id);
     }

     public List<Mascota> getMascotaByDoctor(long id) {
        return mascotaRepository.getMascotasByDoctor(id);
     }

     public List<Mascota> getMascotaByDuenyo(long id) {
        return mascotaRepository.getMascotasByDuenyo(id);
     }

     public void deleteMascotasByDuenyo(long id) {
         mascotaRepository.deleteMascotasByDuenyo(id);
     }

    public Mascota buildMascota(@Valid MascotaRequest mascotaRequest) {
        long id_duenyo = mascotaRequest.getId_duenyo();
        Optional<Duenyo> opt = duenyoService.getDuenyoById(id_duenyo);
        
        if (getNumberOfDoctors() > 0 && opt.isPresent()) {
            long id_doctor = getRandomDoctorId();
            return Mascota.builder()
            .activo(true)
            .nombre(mascotaRequest.getNombre())
            .raza(mascotaRequest.getRaza())
            .sexo(mascotaRequest.getSexo())
            .id_duenyo(mascotaRequest.getId_duenyo())
            .id_doctor(id_doctor)
            .nacimiento(mascotaRequest.getNacimiento())
            .foto(mascotaRequest.getFoto())
            .build();
        }
       return null;
    }

    private long getNumberOfDoctors() {
        return doctorService.getListDoctores().size();
    }

    private long getRandomDoctorId() {
        List<Doctor> doctores = doctorService.getListDoctores();
        int size = doctores.size();
        int random = (int) Math.floor(Math.random() * size);
        return doctores.get(random).getId();
    }

    public Mascota editMascota(Long id, @Valid MascotaEditRequest mascotaEditRequest) {
        Optional<Mascota> opt = getMascotaById(id);
        if (opt.isPresent()) {
            Mascota mascota = opt.get();
            if (id.equals(mascotaEditRequest.getId())) {
                Mascota editedMascota = buildMascotaByEdit(mascotaEditRequest,mascota);
                mascotaRepository.save(mascota);
                return editedMascota;   
            }
        }
        return null;
    }

    private Mascota buildMascotaByEdit(@Valid MascotaEditRequest mascotaEditRequest, Mascota mascota) {
        return Mascota.builder()
        .activo(true)
        .id(mascotaEditRequest.getId())
        .foto(mascotaEditRequest.getFoto())
        .nombre(mascotaEditRequest.getNombre())
        .raza(mascotaEditRequest.getRaza())
        .sexo(mascotaEditRequest.getSexo())
        .nacimiento(mascotaEditRequest.getNacimiento())
        .id_doctor(mascota.getId_doctor())
        .id_duenyo(mascota.getId_duenyo())
        .build();
    }

}
