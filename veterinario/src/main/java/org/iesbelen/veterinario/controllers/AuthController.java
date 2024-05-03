package org.iesbelen.veterinario.controllers;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.iesbelen.veterinario.model.AuthResponse;
import org.iesbelen.veterinario.model.Credenciales;
import org.iesbelen.veterinario.model.Doctor;
import org.iesbelen.veterinario.model.Duenyo;
import org.iesbelen.veterinario.model.UserPassword;
import org.iesbelen.veterinario.requests.ResetPasswordRequest;
import org.iesbelen.veterinario.requests.ChangePasswordRequest;
import org.iesbelen.veterinario.requests.RegisterRequest;
import org.iesbelen.veterinario.services.CredencialesService;
import org.iesbelen.veterinario.services.DoctorService;
import org.iesbelen.veterinario.services.DuenyoService;
import org.iesbelen.veterinario.services.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@RestController

@RequestMapping("auth")

public class AuthController {

    @Autowired
    private CredencialesService credencialesService;

    @Autowired
    private DuenyoService duenyoService;

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private JwtService jwtService;

    @ApiResponse
    @GetMapping("prueba")
    public ResponseEntity<Credenciales> prueba(HttpSession httpSession) {
        return new ResponseEntity<Credenciales>(((Credenciales) httpSession.getAttribute("usuario")), HttpStatus.OK);
    }

    @PostMapping("login")
    public ResponseEntity<AuthResponse> test(@Valid@RequestBody UserPassword userPassword) {
        return ResponseEntity.ok(credencialesService.login(userPassword));
    }

    @PostMapping("register/duenyo")
    public ResponseEntity<Duenyo> register(@RequestBody RegisterRequest registerRequest) {
        Optional<Credenciales> opt = credencialesService.findCredencialByEmail(registerRequest.getEmail());
        if (!opt.isPresent()) {
            Duenyo duenyo = duenyoService.buildDuenyo(registerRequest);
            Duenyo newDuenyo = duenyoService.addDuenyo(duenyo);

            String rol = "duenyo";

            Credenciales credenciales = credencialesService.buildCredencial(registerRequest, newDuenyo.getId(), rol);
            credencialesService.addCredencial(credenciales);

            return new ResponseEntity<>(newDuenyo, HttpStatus.CREATED);

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

            Credenciales credenciales = credencialesService.buildCredencial(registerRequest, newDoctor.getId(), rol);
            credencialesService.addCredencial(credenciales);
            return new ResponseEntity<>(newDoctor, HttpStatus.CREATED);

        }
        return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
    }

    @PostMapping("password/reset")
    public ResponseEntity<String> resetPassword(@RequestBody @Valid ResetPasswordRequest resetPasswordRequest,
            @RequestHeader("Authorization") String bearer) {
        String token = jwtService.getSubsTringToken(bearer);
        String rol = jwtService.getRolFromToken(token);

        if (rol.equals("administrador")) {
            String email = resetPasswordRequest.getEmail();
            Optional<Credenciales> opt = credencialesService.findCredencialByEmail(email);

            if (opt.isPresent()) {
                Credenciales credenciales = opt.get();
                credencialesService.resetCredencialesPassword(credenciales);
                return new ResponseEntity<>(HttpStatus.OK);
            }

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("password/change")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest,
            @RequestHeader("Authorization") String bearer) {
        List<String> roles = Arrays.asList("duenyo", "doctor");
        String token = jwtService.getSubsTringToken(bearer);
        String rol = jwtService.getRolFromToken(token);
        String email = jwtService.getUsernameFromToken(token);
        boolean isChanged = jwtService.getChangedPasswordFromToken(token);

        if (roles.contains(rol) && !isChanged) {
            Optional<Credenciales> opt = credencialesService.findCredencialByEmail(email);
            if (opt.isPresent()) {
                Credenciales credenciales = opt.get();
                credencialesService.changeCredencialesPassword(changePasswordRequest,credenciales);
                return new ResponseEntity<>(HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

}
