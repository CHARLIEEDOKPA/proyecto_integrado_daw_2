package org.iesbelen.veterinario.services;

import java.util.List;
import java.util.Optional;

import org.iesbelen.veterinario.model.Mascota;
import org.iesbelen.veterinario.repo.MascotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MascotaService {
    
    @Autowired
     private MascotaRepository mascotaRepository;


     public Mascota addMascota(Mascota mascota) {
        return mascotaRepository.save(mascota);    
     }

     public List<Mascota> getMascotas() {
        return mascotaRepository.findAll();
     }

     public Optional<Mascota> getMascotaById(long id) {
      return mascotaRepository.findById(id);
     }

     public List<Mascota> getMascotaByDoctor(long id) {
        return mascotaRepository.getMascotasByDoctor(id);
     }

     public void deleteMascotasByDuenyo(long id) {
         mascotaRepository.deleteMascotasByDuenyo(id);
     }

}
