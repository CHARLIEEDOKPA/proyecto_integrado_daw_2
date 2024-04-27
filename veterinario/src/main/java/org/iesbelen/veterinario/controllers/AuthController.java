package org.iesbelen.veterinario.controllers;

import java.util.Optional;

import org.iesbelen.veterinario.model.AuthResponse;
import org.iesbelen.veterinario.model.Credenciales;
import org.iesbelen.veterinario.model.Doctor;
import org.iesbelen.veterinario.model.Duenyo;
import org.iesbelen.veterinario.model.UserPassword;
import org.iesbelen.veterinario.requests.RegisterRequest;
import org.iesbelen.veterinario.services.CredencialesService;
import org.iesbelen.veterinario.services.DoctorService;
import org.iesbelen.veterinario.services.DuenyoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.servlet.http.HttpSession;





@RestController



@RequestMapping("auth")

public class AuthController {

    @Autowired
    private CredencialesService credencialesService;

    @Autowired
    private DuenyoService duenyoService;

    @Autowired
    private DoctorService doctorService;

    

    @ApiResponse
    @GetMapping("prueba")
    public ResponseEntity<Credenciales> prueba(HttpSession httpSession) {
        return new ResponseEntity<Credenciales>(((Credenciales) httpSession.getAttribute("usuario")), HttpStatus.OK);
    }
    
    @PostMapping("login")
    public ResponseEntity<AuthResponse> test(@RequestBody UserPassword userPassword ) {
        return ResponseEntity.ok(credencialesService.login(userPassword));
    }

    @PostMapping("register/duenyo")
    public ResponseEntity<Duenyo> register(@RequestBody RegisterRequest registerRequest) {
        Optional<Credenciales> opt = credencialesService.findCredencialByEmail(registerRequest.getEmail());
        if (!opt.isPresent()) {
            Duenyo duenyo = duenyoService.buildDuenyo(registerRequest);
            Duenyo newDuenyo = duenyoService.addDuenyo(duenyo);

            String rol = "duenyo";

            Credenciales credenciales = credencialesService.buildCredencial(registerRequest,newDuenyo.getId(),rol);
            credencialesService.addCredencial(credenciales);

            return new ResponseEntity<>(newDuenyo,HttpStatus.CREATED);

        }
        return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
    }

    @PostMapping("register/doctor")
    public ResponseEntity<Doctor> postMethodName(@RequestBody RegisterRequest registerRequest) {
        Optional<Credenciales> opt = credencialesService.findCredencialByEmail(registerRequest.getEmail());
        if (!opt.isPresent()) {
            Doctor doctor = doctorService.buildDoctor(registerRequest);
            Doctor newDoctor = doctorService.saveDoctor(doctor);

            String rol = "doctor";

            Credenciales credenciales = credencialesService.buildCredencial(registerRequest,newDoctor.getId(),rol);
            credencialesService.addCredencial(credenciales);
            return new ResponseEntity<>(newDoctor,HttpStatus.CREATED);

        }
        return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
    }
    




    
    
    

}
