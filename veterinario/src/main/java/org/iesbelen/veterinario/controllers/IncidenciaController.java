package org.iesbelen.veterinario.controllers;

import org.iesbelen.veterinario.model.Incidencia;
import org.iesbelen.veterinario.requests.IncidenciaRequest;
import org.iesbelen.veterinario.services.IncidenciaService;
import org.iesbelen.veterinario.services.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;


@RestController

@RequestMapping("incidencia")

public class IncidenciaController {

    @Autowired
    private IncidenciaService incidenciaService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("add")
    public ResponseEntity<Incidencia> postMethodName(@RequestBody @Valid IncidenciaRequest incidenciaRequest,
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

    @GetMapping("prueba")
    public String getMethodName() {
        return "hola";
    }

    @GetMapping("welcome")
    public ResponseEntity<String> welcome(@RequestHeader("Authorization") String bearer) {
        return new ResponseEntity<>("holaaa" + jwtService.getSubsTringToken(bearer),HttpStatus.ACCEPTED);
    }
    
    

}