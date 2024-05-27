package org.iesbelen.veterinario.controllers;

import java.util.List;

import org.iesbelen.veterinario.dto.CitaDTO;
import org.iesbelen.veterinario.model.Cita;
import org.iesbelen.veterinario.requests.CitaRequest;
import org.iesbelen.veterinario.services.CitaService;
import org.iesbelen.veterinario.services.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

@RequestMapping("cita")

public class CitaController {

    @Autowired
    private CitaService citaService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("add")
    public ResponseEntity<Cita> addCitaEntity(@RequestBody CitaRequest citaRequest,
            @RequestHeader("Authorization") String bearer) {
        String token = jwtService.getSubsTringToken(bearer);
        String rol = jwtService.getRolFromToken(token);
        Long id_doctor = jwtService.getIdFromToken(token);

        if (rol.equals("doctor")) {
            if (citaService.citaRequestCorrect(citaRequest) 
            && citaService.freeReservedTimeDate(id_doctor, citaRequest)) {
                Cita cita = citaService.buildCita(citaRequest,id_doctor);
                Cita newCita = citaService.saveCita(cita);
                return new ResponseEntity<>(newCita,HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("get/mascota/{id}")
    public ResponseEntity<List<Cita>> getCitasOfMascotas(@PathVariable Long id_mascota,
            @RequestHeader("Authorization") String bearer) {
        String token = jwtService.getSubsTringToken(bearer);
        String rol = jwtService.getRolFromToken(token);
        Long id_duenyo = jwtService.getIdFromToken(token);

        if (rol.equals("duenyo")) {
            List<Cita> citas = citaService.getCitasByIdMascota(id_mascota, id_duenyo);
            return citas != null ? new ResponseEntity<List<Cita>>(citas, HttpStatus.OK)
                    : new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<String> invalidJSONFormatException() {
        return new ResponseEntity<>("Invalid JSON Format or JSON missing", HttpStatus.BAD_REQUEST);
    }

    @GetMapping("get")
    public ResponseEntity<List<CitaDTO>> getCitasOfDuenyo(@RequestHeader("Authorization") String bearer) {
        String token = jwtService.getSubsTringToken(bearer);
        String rol = jwtService.getRolFromToken(token);
        Long id = jwtService.getIdFromToken(token);

        if (rol.equals("duenyo")) {
            List<Cita> citas = citaService.geCitasByDuenyo(id);
            List<CitaDTO> citaDTOs = citaService.citasToDto(citas);
            return new ResponseEntity<>(citaDTOs, HttpStatus.OK);
        }

        if (rol.equals("doctor")) {
            List<Cita> citas = citaService.getCitasByIdDoctor(id);
            List<CitaDTO> citaDTOs = citaService.citasToDto(citas);
            return new ResponseEntity<>(citaDTOs, HttpStatus.OK); 
        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    

}
