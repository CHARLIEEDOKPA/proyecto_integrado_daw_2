package org.iesbelen.veterinario.controllers;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.iesbelen.veterinario.model.Duenyo;
import org.iesbelen.veterinario.requests.DuenyoEditRequest;
import org.iesbelen.veterinario.services.DuenyoService;
import org.iesbelen.veterinario.services.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;





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
        
        if (rol.equals("administrador") || rol.equals("subadministrador")) {
            List<Duenyo> duenyos = duenyoService.getListDuenyo();
            return new ResponseEntity<>(duenyos,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("mascota/{id_mascota}")
    public ResponseEntity<Duenyo> getDuenyoByMascotaId(@PathVariable Long id_mascota,@RequestHeader("Authorization") String bearer) {
        String token = jwtService.getSubsTringToken(bearer);
        String rol = jwtService.getRolFromToken(token);
        if (rol.equals("doctor") || rol.equals("subadministrador")) {
            Optional<Duenyo> opt = duenyoService.getDuenyoByMascotaId(id_mascota);
            return opt.isPresent() ? new ResponseEntity<>(opt.get(),HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
    

    @GetMapping("token")
    public ResponseEntity<Duenyo> getDuenyoByTheToken(@RequestHeader("Authorization") String bearer){
        String token = jwtService.getSubsTringToken(bearer);
        String rol = jwtService.getRolFromToken(token);
        Long id = jwtService.getIdFromToken(token);

        if (rol.equals("duenyo")) {
            Optional<Duenyo> opt = duenyoService.getDuenyoById(id);
            return opt.isPresent()? new ResponseEntity<>(opt.get(),HttpStatus.OK): new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("{id}")
    public ResponseEntity<Duenyo> getDuenyo(@PathVariable Long id, @RequestHeader("Authorization") String bearer) {
        String token = jwtService.getSubsTringToken(bearer);
        String rol = jwtService.getRolFromToken(token);
        List<String> roles = Arrays.asList("duenyo","administrador","subadministrador");
        if (roles.contains(rol)) {
            Optional<Duenyo> opt = duenyoService.getDuenyoById(id);
            
            if (opt.isPresent()) {
                Duenyo duenyo = opt.get();
                return new ResponseEntity<>(duenyo,HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("find/{pattern}")
    public ResponseEntity<List<Duenyo>> getDuenyosByPattern(@PathVariable String pattern,@RequestHeader("Authorization")String bearer) {
        String token = jwtService.getSubsTringToken(bearer);
        String rol = jwtService.getRolFromToken(token);
        if (rol.equals("duenyo")) {
            List<Duenyo> duenyos = duenyoService.getDuenyosByPattern(pattern.toLowerCase());
            return new ResponseEntity<>(duenyos,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
    

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteDuenyo(@PathVariable Long id, @RequestHeader("Authorization") String bearer) {
        String token = jwtService.getSubsTringToken(bearer);
        String rol = jwtService.getRolFromToken(token);
        if (rol.equals("administrador") || rol.equals("subadministrador")) {
           if (duenyoService.deleteDuenyo(id)) {
                return new ResponseEntity<>(HttpStatus.OK);
           }
           return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @PutMapping("{id}")
    public ResponseEntity<String> editDuenyo(@PathVariable Long id, @Valid @RequestBody DuenyoEditRequest duenyoEditRequest,@RequestHeader("Authorization")String bearer) {
        String token = jwtService.getSubsTringToken(bearer);
        String rol = jwtService.getRolFromToken(token);
        if (rol.equals("administrador") || rol.equals("subadministrador")) {
            Duenyo editedDuenyo = duenyoService.editDuenyo(duenyoEditRequest,id);
            
            return editedDuenyo != null? new ResponseEntity<>(HttpStatus.OK) : new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
    
    
    
}
