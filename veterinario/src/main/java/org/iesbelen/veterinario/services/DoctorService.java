package org.iesbelen.veterinario.services;

import java.util.List;
import java.util.Optional;

import org.iesbelen.veterinario.model.Doctor;
import org.iesbelen.veterinario.model.Mascota;
import org.iesbelen.veterinario.repo.DoctorRepository;
import org.iesbelen.veterinario.requests.RegisterRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DoctorService {
    
    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private CredencialesService credencialesService;

    @Autowired
    private MascotaService mascotaService;


    public Optional<Doctor> getDoctorById(long id) {
        return doctorRepository.getActiveDoctor(id);
    }

    public Doctor saveDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public List<Doctor> getListDoctores() {
        return doctorRepository.getActiveDoctors();
    }

    public boolean modifyDoctor(Long id, Doctor doctor) {
        Optional<Doctor> opt = doctorRepository.findById(id);
        if (opt.isPresent()) {
            boolean equals = id.equals(doctor.getId());
            if (equals) {
                doctorRepository.save(doctor);
            }
            return equals;
        }
        return false;
    }

    public boolean deleteDoctor(long id) {
        Optional<Doctor> opt =  doctorRepository.getActiveDoctor(id);
        if (opt.isPresent()) {

            doctorRepository.deleteDoctor(id);
            credencialesService.removeCredencial("doctor", id);
            changeMascotasDoctor(id);

            return true;
        }
        return false;
        
    }

    private void changeMascotasDoctor(long id) {
        List<Mascota> mascotas = mascotaService.getMascotaByDoctor(id);
        List<Doctor> doctores = doctorRepository.getActiveDoctors();

        int size = doctores.size();

        for (Mascota mascota : mascotas) {
            int i = (int) Math.floor(Math.random() * size);
            mascota.setId_doctor(doctores.get(i).getId());
            mascotaService.addMascota(mascota);
        }
    }

    public Doctor buildDoctor(RegisterRequest registerRequest) {
        return Doctor.builder().activo(true)
        .nombre(registerRequest.getNombre())
        .apellidos1(registerRequest.getApellidos1())
        .apellidos2(registerRequest.getApellidos2())
        .email(registerRequest.getEmail())
        .nacimiento(registerRequest.getNacimiento())
        .residencia(registerRequest.getResidencia())
        .telefono(registerRequest.getTelefono())
        .build();
    }

    public Optional<Doctor> getDoctorByRecomendacion(long id) {
        return this.doctorRepository.getDoctorByRecomendacion(id);
    } 
}
