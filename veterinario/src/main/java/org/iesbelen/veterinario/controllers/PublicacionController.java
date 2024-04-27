package org.iesbelen.veterinario.controllers;

import java.util.List;
import java.util.Optional;

import org.iesbelen.veterinario.model.Comentario;
import org.iesbelen.veterinario.model.MeGusta;
import org.iesbelen.veterinario.model.Publicacion;
import org.iesbelen.veterinario.requests.ComentarioRequest;
import org.iesbelen.veterinario.services.ComentarioService;
import org.iesbelen.veterinario.services.JwtService;
import org.iesbelen.veterinario.services.MeGustaService;
import org.iesbelen.veterinario.services.PublicacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;




@RestController

@RequestMapping("publicacion")


public class PublicacionController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PublicacionService publicacionService;

    @Autowired 
    private MeGustaService meGustaService;

    @Autowired
    private ComentarioService comentarioService;
    
    @GetMapping("getall")
    public ResponseEntity<List<Publicacion>> getPublicacionesByDuenyo(@RequestHeader("Authorization") String bearer) {
        String token = jwtService.getSubsTringToken(bearer);
        String rol = jwtService.getRolFromToken(token);
        Long id = jwtService.getIdFromToken(token);

        return rol.equals("duenyo") ? new ResponseEntity<>(publicacionService.getPublicacionesByDuenyo(id), HttpStatus.OK)
        :new ResponseEntity<>(HttpStatus.UNAUTHORIZED); 
    }

    @PostMapping("megusta/{id}")
    public ResponseEntity<String> meGusta(@PathVariable Long id_publicacion,@RequestHeader("Authorization") String bearer) {
        
        String token = jwtService.getSubsTringToken(bearer);
        String rol = jwtService.getRolFromToken(token);
        Long id_duenyo = jwtService.getIdFromToken(token);

        if (!rol.equals("duenyo")) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Optional<Publicacion> opt = publicacionService.getPublicacionById(id_publicacion);
        if (opt.isPresent()) {
            MeGusta meGusta = meGustaService.buildMeGusta(id_duenyo,id_publicacion);
            meGustaService.addMeGusta(meGusta);
            return new ResponseEntity<>(HttpStatus.OK);

        }
        return new ResponseEntity<>("La publicación que quisiste likear no se encuentra", HttpStatus.NOT_FOUND);

    }

    @PostMapping("nomegusta/{id}")
    public ResponseEntity<String> postMethodName(@PathVariable Long id_publicacion,@RequestHeader("Authorization") String bearer) {
        String token = jwtService.getSubsTringToken(bearer);
        String rol = jwtService.getRolFromToken(token);
        Long id_duenyo = jwtService.getIdFromToken(token);

        if (rol.equals("duenyo")) {
            
            Optional<Publicacion> opt = publicacionService.getPublicacionById(id_publicacion);     
            if (opt.isPresent()) {
                meGustaService.deleteMeGusta(id_duenyo, id_publicacion);
                return new ResponseEntity<>(HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

    }

    @PostMapping("comentario/add")
    public ResponseEntity<Comentario> addComentario(@RequestBody @Valid ComentarioRequest comentarioRequest, @RequestHeader("Authorization") String bearer) {
        String token = jwtService.getSubsTringToken(bearer);
        String rol = jwtService.getRolFromToken(token);
        Long id = jwtService.getIdFromToken(token);

        if (rol.equals("duenyo")) {
            if (comentarioService.duenyoAndPublicationExists(comentarioRequest.getId_publicacion(), id)) {
                Comentario comentario = comentarioService.buildComentario(comentarioRequest, id);
                Comentario newComentario = comentarioService.addComentario(comentario);
                return new ResponseEntity<>(newComentario,HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
    
    
    
    

}
