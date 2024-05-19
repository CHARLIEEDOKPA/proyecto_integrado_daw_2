package org.iesbelen.veterinario.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.iesbelen.veterinario.dto.CitaDTO;
import org.iesbelen.veterinario.mapper.CitaMapper;
import org.iesbelen.veterinario.model.Cita;
import org.iesbelen.veterinario.model.Doctor;
import org.iesbelen.veterinario.model.Duenyo;
import org.iesbelen.veterinario.model.Mascota;
import org.iesbelen.veterinario.repo.CitaRepository;
import org.iesbelen.veterinario.requests.CitaRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CitaService {


    @Autowired
    private CitaRepository citaRepository;

    @Autowired
    private MascotaService mascotaService;

    @Autowired
    private CitaMapper citaMapper;

    @Autowired
    private DuenyoService duenyoService;

    @Autowired
    private DoctorService doctorService;

    public List<Cita> getAllCitas() {
        return citaRepository.findAll();
    }

    public List<Cita> getCitasByIdMascota(Long id_mascota, Long id_duenyo) {
        Optional<Mascota> opt_mascota = mascotaService.getMascotaById(id_mascota);
        Optional<Duenyo> opt_duenyo = duenyoService.getDuenyoById(id_duenyo);

        if (opt_duenyo.isPresent() && opt_mascota.isPresent()) {
            Mascota mascota = opt_mascota.get();
            return id_duenyo.equals(mascota.getId_duenyo())  ? citaRepository.getCitasByIdMascota(id_mascota) : null;
        }
        return null;

    }

    public List<Cita> getCitasByIdDoctor(long id) {
        return citaRepository.getCitasByIdDoctor(id);
    }

    public Optional<Cita> getCitaById(long id) {
        return citaRepository.findById(id);
    }

    synchronized public Cita saveCita(Cita cita){
        return citaRepository.save(cita);
    }

    public boolean editCita(Long id,Cita cita) {
        Optional<Cita> opt = citaRepository.findById(id);
        if (opt.isPresent()) {
            boolean equals = id.equals(cita.getId());
            if (equals) {
                citaRepository.save(cita);
            }
            return equals;
        }
        return false;
    }

    public boolean removeCita(long id) {
        Optional<Cita> opt =  citaRepository.findById(id);
        if (opt.isPresent()) {
            citaRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public boolean citaRequestCorrect(CitaRequest citaRequest) {
        if (citaRequest.getTime() == null) {
            return false;
        }

        if (citaRequest.getDate() == null) {
            return false;
        }
        
        return mascotaService.getMascotaById(citaRequest.getId_mascota()).isPresent();
    }

    public List<Cita> geCitasByDuenyo(long id) {
        return citaRepository.getCitasByDuenyo(id);
    }

    public boolean freeReservedTimeDate(Long id_doctor, CitaRequest citaRequest) {
        return !citaRepository.getCitaByDateTime(citaRequest.getTime(), citaRequest.getDate(), id_doctor).isPresent();
    }

    public Cita buildCita(CitaRequest citaRequest, Long id_doctor) {
        return Cita.builder()
        .id_doctor(id_doctor)
        .id_mascota(citaRequest.getId_mascota())
        .time(citaRequest.getTime())
        .date(citaRequest.getDate())
        .build();
    }

    public List<CitaDTO> citasToDto(List<Cita> citas) {
        List<CitaDTO> citaDTOs =  new ArrayList<>();
        citas.forEach(c -> {
            Optional<Doctor> opt_doctor = doctorService.getDoctorById(c.getId_doctor());
            Optional<Mascota> opt_mascota =  mascotaService.getMascotaById(c.getId_mascota());

            if (opt_doctor.isPresent() && opt_mascota.isPresent()) {
                Mascota mascota = opt_mascota.get();
                Doctor doctor = opt_doctor.get();
                CitaDTO citaDTO = citaMapper.citaToDto(c, doctor, mascota, c.getId_doctor(),c.getId());
                citaDTOs.add(citaDTO);
            }
            
        });


        return citaDTOs;
    }
    
}
