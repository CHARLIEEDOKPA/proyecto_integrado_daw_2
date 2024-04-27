package org.iesbelen.veterinario.controllers;

import java.util.List;

import org.iesbelen.veterinario.model.Mascota;
import org.iesbelen.veterinario.services.MascotaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

@RequestMapping("mascota")

public class MascotaController {

    @Autowired
    private MascotaService mascotaService;

    @GetMapping("all")
    public ResponseEntity<List<Mascota>> getMethodName() {
        return new ResponseEntity<List<Mascota>>(mascotaService.getMascotas(), HttpStatus.OK);
    }

}
