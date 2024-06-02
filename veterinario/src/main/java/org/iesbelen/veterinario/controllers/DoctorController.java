package org.iesbelen.veterinario.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

import org.iesbelen.veterinario.model.Doctor;
import org.iesbelen.veterinario.model.Duenyo;
import org.iesbelen.veterinario.services.DoctorService;
import org.iesbelen.veterinario.services.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;




@RestController
@RequestMapping("doctor")


public class DoctorController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private DoctorService doctorService;
    
    @GetMapping("token")
    public ResponseEntity<Doctor> getDoctorByToken(@RequestHeader("Authorization") String bearer) {
        String token = jwtService.getSubsTringToken(bearer);
        String rol = jwtService.getRolFromToken(token);
        Long id = jwtService.getIdFromToken(token);

        if (rol.equals("doctor")) {
            Optional<Doctor> opt = doctorService.getDoctorById(id);
            return opt.isPresent()? new ResponseEntity<>(opt.get(),HttpStatus.OK): new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }


    @GetMapping("{id_doctor}")
    public ResponseEntity<Doctor> getMethodName(@PathVariable Long id_doctor , @RequestHeader("Authorization") String bearer) {
        String token = jwtService.getSubsTringToken(bearer);
        String rol = jwtService.getRolFromToken(token);
        if (rol.equals("administrador") || rol.equals("subadministrador")) {
            Optional<Doctor> opt = doctorService.getDoctorById(id_doctor);
            if (opt.isPresent()) {
                Doctor doctor = opt.get();
                return new ResponseEntity<>(doctor,HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
         return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @PutMapping("{id_doctor}")
    public ResponseEntity<String> editDoctor(@PathVariable Long id_doctor , @RequestHeader("Authorization") String bearer, @RequestBody
     Doctor doctor) {
        String token = jwtService.getSubsTringToken(bearer);
        String rol = jwtService.getRolFromToken(token);

        if (rol.equals("administrador") || rol.equals("subadministrador")) {
            Doctor editedDoctor = this.doctorService.modifyDoctor(id_doctor, doctor);
            return editedDoctor !=  null ? new ResponseEntity<>(HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @DeleteMapping("{id_doctor}")
    public ResponseEntity<String> deleteDoctor(@PathVariable Long id_doctor,  @RequestHeader("Authorization") String bearer) {
        String token = jwtService.getSubsTringToken(bearer);
        String rol = jwtService.getRolFromToken(token);

        if (rol.equals("administrador") || rol.equals("subadministrador")) {
            Optional<Doctor> opt = doctorService.getDoctorById(id_doctor);
            if (opt.isPresent()) {
                boolean deleted = doctorService.deleteDoctor(id_doctor);
                return deleted ? new ResponseEntity<>(HttpStatus.OK) : new ResponseEntity<>(HttpStatus.CONFLICT);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
    
    

    @GetMapping("recomendacion/{id}")
    public ResponseEntity<Doctor> getDoctorByRecomendacion(@RequestHeader("Authorization") String bearer, @PathVariable long id) {
        String token = jwtService.getSubsTringToken(bearer);
        String rol = jwtService.getRolFromToken(token);

        if (rol.equals("duenyo")) {
            Optional<Doctor> opt = doctorService.getDoctorByRecomendacion(id);
            if (opt.isPresent()) {
                Doctor doctor = opt.get();
                return new ResponseEntity<>(doctor,HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

    }

    @GetMapping("all")
    public ResponseEntity<List<Doctor>> getAllDoctores(@RequestHeader("Authorization") String bearer) {
        String token = jwtService.getSubsTringToken(bearer);
        String rol = jwtService.getRolFromToken(token);

        if (rol.equals("administrador") || rol.equals("subadministrador")) {
            List<Doctor> doctores = doctorService.getListDoctores();
            return new ResponseEntity<>(doctores,HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
    
    
    

}
