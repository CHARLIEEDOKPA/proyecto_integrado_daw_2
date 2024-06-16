package org.iesbelen.veterinario.controllers;

import java.util.List;
import java.util.Optional;

import org.iesbelen.veterinario.dto.RecomendacionDTO;
import org.iesbelen.veterinario.model.Mascota;
import org.iesbelen.veterinario.model.Recomendacion;
import org.iesbelen.veterinario.requests.RecomendacionRequest;
import org.iesbelen.veterinario.services.JwtService;
import org.iesbelen.veterinario.services.MascotaService;
import org.iesbelen.veterinario.services.RecomendacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;




@RestController
@RequestMapping("recomendacion")


public class RecomendacionController {

    @Autowired
    private RecomendacionService recomendacionService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private MascotaService mascotaService;


    @PostMapping("add")
    public ResponseEntity<Recomendacion> saveRecomendacion(@RequestBody @Valid RecomendacionRequest recomendacionRequest,HttpSession httpSession, BindingResult bindingResult,@RequestHeader("Authorization") String bearer) {
        String token = jwtService.getSubsTringToken(bearer);
        String rol = jwtService.getRolFromToken(token);
        Long id = jwtService.getIdFromToken(token);
        if (rol.equals("doctor")) {
            Recomendacion recomendacion = recomendacionService.buildRecomendacion(recomendacionRequest,id);
            if (recomendacion != null) {
                Recomendacion newRecomendacion = recomendacionService.addRecomendacion(recomendacion);
                return new ResponseEntity<Recomendacion>(newRecomendacion, HttpStatus.CREATED);
            }
           return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("read/{id_recomendacion}")
    public ResponseEntity<String> readRecomendacion(@PathVariable Long id_recomendacion, @RequestHeader("Authorization") String bearer) {
        String token = jwtService.getSubsTringToken(bearer);
        String rol = jwtService.getRolFromToken(token);
        Long id = jwtService.getIdFromToken(token);

        if (rol.equals("duenyo")) {
            Optional<Recomendacion> opt = recomendacionService.getRecomendacionById(id_recomendacion);
            if (opt.isPresent()) {
                Recomendacion recomendacion = opt.get();
                Optional<Mascota> opt_mascota = mascotaService.getMascotaById(recomendacion.getId_mascota());
                if (opt_mascota.isPresent() && id.equals(opt_mascota.get().getId_duenyo()) ) {
                    this.recomendacionService.readRecomendacion(id_recomendacion);
                    return new ResponseEntity<>(HttpStatus.OK);
                }
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

    }
    

    @GetMapping("get/duenyo")
    public ResponseEntity<List<RecomendacionDTO>> getMethodName(@RequestHeader("Authorization") String bearer) {
       List<RecomendacionDTO> recomendacionDTOs;
       String token = jwtService.getSubsTringToken(bearer);
        String rol = jwtService.getRolFromToken(token);
        Long id = jwtService.getIdFromToken(token);
        if (rol.equals("duenyo")) {
            List<Recomendacion> recomendaciones = recomendacionService.getRecomendacionesByDuenyo(id);
            recomendacionDTOs = recomendacionService.getRecomendacionesDTO(recomendaciones);
            return new ResponseEntity<>(recomendacionDTOs,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
    

    @GetMapping("{id_recomendacion}")
    public ResponseEntity<RecomendacionDTO> getRecomendacionByID(@PathVariable Long id_recomendacion,@RequestHeader("Authorization") String bearer ) {
        String token = jwtService.getSubsTringToken(bearer);
        String rol = jwtService.getRolFromToken(token);
        Long id = jwtService.getIdFromToken(token);

        if (rol.equals("duenyo")) {
            Optional<Recomendacion> opt = recomendacionService.getRecomendacionById(id_recomendacion);
            if (opt.isPresent()) {
                Recomendacion recomendacion = opt.get();
                RecomendacionDTO recomendacionDTO = recomendacionService.getRecomendacionByIdDTO(recomendacion);
                Optional<Mascota> opt_mascota = mascotaService.getMascotaById(recomendacion.getId_mascota());
                if (opt_mascota.isPresent() && recomendacionDTO != null) {
                    Mascota mascota = opt_mascota.get();
                    return id.equals(mascota.getId_duenyo()) ? new ResponseEntity<>(recomendacionDTO,HttpStatus.OK) : new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
                }
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

    }
    

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> invalidFormat() {
        return new ResponseEntity<>("Invalid Format",HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<String> invalidJSONFormatException() {
        return new ResponseEntity<>("Invalid JSON Format", HttpStatus.BAD_REQUEST);
    } 
     
    @ExceptionHandler(DataIntegrityViolationException.class) 
    public ResponseEntity<String> DataIntegrityViolationException() {
        return new ResponseEntity<>("ERROR", HttpStatus.BAD_REQUEST);
    } 
}
