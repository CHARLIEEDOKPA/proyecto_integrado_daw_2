package org.iesbelen.veterinario.controllers;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.iesbelen.veterinario.model.Mascota;
import org.iesbelen.veterinario.requests.MascotaEditRequest;
import org.iesbelen.veterinario.requests.MascotaRequest;
import org.iesbelen.veterinario.services.JwtService;
import org.iesbelen.veterinario.services.MascotaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;

@RestController

@RequestMapping("mascota")

public class MascotaController {

    @Autowired
    private MascotaService mascotaService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("add")
    public ResponseEntity<Mascota> addMascota(@RequestBody @Valid MascotaRequest mascotaRequest,
            @RequestHeader("Authorization") String bearer) {
        String token = jwtService.getSubsTringToken(bearer);
        String rol = jwtService.getRolFromToken(token);

        if (rol.equals("administrador")) {
            Mascota mascota = mascotaService.buildMascota(mascotaRequest);
            if (mascota != null) {
                Mascota newMascota = mascotaService.addMascota(mascota);
                return new ResponseEntity<>(newMascota, HttpStatus.CREATED);
            }
            return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);

        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("all")
    public ResponseEntity<List<Mascota>> getAllMascotas(@RequestHeader("Authorization") String bearer) {
        String token = jwtService.getSubsTringToken(bearer);
        String rol = jwtService.getRolFromToken(token);
        if (rol.equals("administrador")) {
            return new ResponseEntity<>(mascotaService.getMascotas(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("{id}")
    public ResponseEntity<Mascota> getMascotaById(@PathVariable Long id,
            @RequestHeader("Authorization") String bearer) {
        String token = jwtService.getSubsTringToken(bearer);
        String rol = jwtService.getRolFromToken(token);
        Long id_duenyo = jwtService.getIdFromToken(token);
        List<String> roles = Arrays.asList("administrador", "duenyo","doctor");

        if (roles.contains(rol)) {
            Optional<Mascota> opt = mascotaService.getMascotaById(id);
            if (opt.isPresent()) {
                Mascota mascota = opt.get();
                if (rol.equals("duenyo")) {
                    return id_duenyo.equals(mascota.getId_duenyo()) ? new ResponseEntity<>(mascota, HttpStatus.OK)
                            : new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
                }
                if (rol.equals("doctor")) {
                    return id_duenyo.equals(mascota.getId_doctor()) ? new ResponseEntity<>(mascota, HttpStatus.OK)
                            : new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
                }
                return new ResponseEntity<>(mascota, HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("get")
    public ResponseEntity<List<Mascota>> getMascotasByDuenyo(@RequestHeader("Authorization") String bearer) {

        String token = jwtService.getSubsTringToken(bearer);
        String rol = jwtService.getRolFromToken(token);
        long id = jwtService.getIdFromToken(token);
        List<Mascota> mascotas;

        if (rol.equals("duenyo")) {
            mascotas = mascotaService.getMascotaByDuenyo(id);
            return new ResponseEntity<>(mascotas, HttpStatus.OK);
        }

        if (rol.equals("doctor")) {
            mascotas = mascotaService.getMascotaByDoctor(id);
            return new ResponseEntity<>(mascotas, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteMascota(@PathVariable long id, @RequestHeader("Authorization") String bearer) {
        String token = jwtService.getSubsTringToken(bearer);
        String rol = jwtService.getRolFromToken(token);

        if (rol.equals("administrador")) {

            Optional<Mascota> opt = mascotaService.getMascotaById(id);

            if (opt.isPresent()) {
                mascotaService.deleteMascota(id);
                return new ResponseEntity<>(HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @PutMapping("{id}")
    public ResponseEntity<String> editMascota(@PathVariable Long id,
            @RequestBody @Valid MascotaEditRequest mascotaEditRequest, @RequestHeader("Authorization") String bearer) {
        String token = jwtService.getSubsTringToken(bearer);
        String rol = jwtService.getRolFromToken(token);

        if (rol.equals("administrador")) {
            Mascota editedMascota = mascotaService.editMascota(id, mascotaEditRequest);
            return editedMascota != null ? new ResponseEntity<>(HttpStatus.OK)
                    : new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

}
