package org.iesbelen.veterinario.controllers;

import java.util.Arrays;
import java.util.List;

import org.iesbelen.veterinario.model.Duenyo;
import org.iesbelen.veterinario.services.DuenyoService;
import org.iesbelen.veterinario.services.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController

@RequestMapping("duenyo")


public class DuenyoController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private DuenyoService duenyoService;

    

    @GetMapping("all")
    public ResponseEntity<List<Duenyo>> getDuenyos(@RequestHeader("Authorization") String bearer) {
        String token = jwtService.getSubsTringToken(bearer);
        String rol = jwtService.getRolFromToken(token);
        
        if (rol.equals("administrador")) {
            List<Duenyo> duenyos = duenyoService.getListDuenyo();
            return new ResponseEntity<>(duenyos,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("{id}")
    public ResponseEntity<Duenyo> getDuenyo(@PathVariable Long id, @RequestHeader("Authorization") String bearer) {
        String token = jwtService.getSubsTringToken(bearer);
        String rol = jwtService.getRolFromToken(token);
        List<String> roles = Arrays.asList("duenyo","administrador");
        if (roles.contains(rol)) {
            Duenyo duenyo = duenyoService.getDuenyoById(id).get();
            if (duenyo != null && duenyo.isActivo()) {
                return new ResponseEntity<>(duenyo,HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteDuenyo(@PathVariable Long id, @RequestHeader("Authorization") String bearer) {
        String token = jwtService.getSubsTringToken(bearer);
        String rol = jwtService.getRolFromToken(token);
        if (rol.equals("administrador")) {
           if (duenyoService.deleteDuenyo(id)) {
                return new ResponseEntity<>(HttpStatus.OK);
           }
           return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
    
    
    
}