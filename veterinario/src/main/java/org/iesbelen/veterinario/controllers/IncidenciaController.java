package org.iesbelen.veterinario.controllers;

import java.util.List;
import java.util.Optional;

import org.iesbelen.veterinario.dto.IncidenciaDTO;
import org.iesbelen.veterinario.model.Incidencia;
import org.iesbelen.veterinario.requests.IncidenciaRequest;
import org.iesbelen.veterinario.services.IncidenciaService;
import org.iesbelen.veterinario.services.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.RequestParam;

@RestController

@RequestMapping("incidencia")

public class IncidenciaController {

    @Autowired
    private IncidenciaService incidenciaService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("add")
    public ResponseEntity<Incidencia> addIncidencia(@RequestBody @Valid IncidenciaRequest incidenciaRequest,
            BindingResult bindingResult, @RequestHeader("Authorization") String bearer) {

        String token = jwtService.getSubsTringToken(bearer);
        String rol = jwtService.getRolFromToken(token);
        Long id = jwtService.getIdFromToken(token);

        if (rol.equals("duenyo")) {
            Incidencia incidencia = incidenciaService.buildIncidencia(incidenciaRequest, id);
            if (incidencia != null) {
                Incidencia newIncidencia = incidenciaService.addIncidencia(incidencia);
                return new ResponseEntity<Incidencia>(newIncidencia, HttpStatus.CREATED);
            }
            return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
        }

        return new ResponseEntity<Incidencia>(HttpStatus.UNAUTHORIZED);
    }

    // @GetMapping("incidencia/{id_incidencia}")
    // public ResponseEntity<List<Incidencia>> getMethodName(@RequestParam String
    // param) {
    // return new String();
    // } n

    @PostMapping("read/{id_incidencia}")
    public ResponseEntity<String> read(@PathVariable Long id_incidencia,
            @RequestHeader("Authorization") String bearer) {
        String token = jwtService.getSubsTringToken(bearer);
        String rol = jwtService.getRolFromToken(token);
        Long id = jwtService.getIdFromToken(token);
        if (rol.equals("doctor")) {
            Optional<Incidencia> opt = incidenciaService.getIncidenciaById(id);
            if (opt.isPresent()) {
                incidenciaService.readIncidencia(id);
                return id.equals(opt.get().getId_doctor()) ? new ResponseEntity<>(HttpStatus.OK)
                        : new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("mascota/{id_mascota}")
    public ResponseEntity<List<Incidencia>> getIncidenciaByMascotas(@PathVariable Long id_mascota,
            @RequestHeader("Authorization") String bearer) {
        String token = jwtService.getSubsTringToken(bearer);
        String rol = jwtService.getRolFromToken(token);
        long id = jwtService.getIdFromToken(token);

        if (rol.equals("duenyo")) {
            List<Incidencia> incidencias = incidenciaService.getIncidenciaByMascotaAndByDuenyo(id_mascota, id);
            return incidencias != null ? new ResponseEntity<>(incidencias, HttpStatus.OK)
                    : new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("{id_incidencia}")
    public ResponseEntity<IncidenciaDTO> getIncidencia(@PathVariable Long id_incidencia,
            @RequestHeader("Authorization") String bearer) {
        String token = jwtService.getSubsTringToken(bearer);
        String rol = jwtService.getRolFromToken(token);
        Long id = jwtService.getIdFromToken(token);

        if (rol.equals("doctor")) {
            Optional<Incidencia> opt = incidenciaService.getIncidenciaById(id_incidencia);
            if (opt.isPresent()) {
                Incidencia incidencia = opt.get();
                IncidenciaDTO incidenciaDTO = incidenciaService.getIncidenciaDTO(incidencia);
                if (incidenciaDTO != null) {
                    return id.equals(incidencia.getId_doctor()) ? new ResponseEntity<>(incidenciaDTO, HttpStatus.OK)
                            : new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
                }
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("doctor")
    public ResponseEntity<List<IncidenciaDTO>> getIncidenciasByDoctor(@RequestHeader("Authorization") String bearer) {
        String token = jwtService.getSubsTringToken(bearer);
        String rol = jwtService.getRolFromToken(token);
        Long id = jwtService.getIdFromToken(token);

        if (rol.equals("doctor")) {
            List<Incidencia> incidencias = incidenciaService.getIncidenciasByDoctor(id);
            List<IncidenciaDTO> incidenciaDTOs = incidenciaService.getListIncidenciaDTO(incidencias);
            return new ResponseEntity<>(incidenciaDTOs, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

}