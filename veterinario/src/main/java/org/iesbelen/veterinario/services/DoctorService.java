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

    public Doctor modifyDoctor(Long id, Doctor doctorEdit) {
        Optional<Doctor> opt = doctorRepository.getActiveDoctor(id);
        if (opt.isPresent()) {
            Doctor doctor = opt.get();
            boolean equals = id.equals(doctor.getId());
            if (equals) {
                Doctor editedDoctor = buildDoctorByEdit(doctor,doctorEdit);
                doctorRepository.save(editedDoctor);
                return editedDoctor;
            }
        }
        return null;
    }

    private Doctor buildDoctorByEdit(Doctor doctor, Doctor doctorEdit) {
        return Doctor.builder()
            .id(doctor.getId())
            .activo(true)
            .nombre(doctorEdit.getNombre())
            .nacimiento(doctorEdit.getNacimiento())
            .apellidos1(doctorEdit.getApellidos1())
            .apellidos2(doctorEdit.getApellidos2())
            .email(doctor.getEmail())
            .telefono(doctorEdit.getTelefono())
            .residencia(doctorEdit.getResidencia())
            .citas(doctor.getCitas())
            .mascotas(doctor.getMascotas())
            .recomendaciones(doctor.getRecomendaciones())
            .incidencias(doctor.getIncidencias())
            .build();

    }

    public void deleteDoctor(long id) {
            doctorRepository.deleteDoctor(id);
            credencialesService.removeCredencial("doctor", id);
            changeMascotasDoctor(id);

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
