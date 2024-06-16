package org.iesbelen.veterinario.services;

import java.util.Optional;

import org.iesbelen.veterinario.model.AuthResponse;
import org.iesbelen.veterinario.model.Credenciales;
import org.iesbelen.veterinario.model.Doctor;
import org.iesbelen.veterinario.model.Duenyo;
import org.iesbelen.veterinario.model.UserPassword;
import org.iesbelen.veterinario.repo.CredencialesRepository;
import org.iesbelen.veterinario.requests.ChangePasswordRequest;
import org.iesbelen.veterinario.requests.RegisterRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CredencialesService {

	@Autowired
	private CredencialesRepository credencialesRepository;

	@Autowired
	private JwtService jwtService;

	@Autowired
	private AuthenticationManager auth;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public void addDoctorCredencial(Doctor doctor) {
		Credenciales credenciales = new Credenciales();
		credenciales.setContrasenya("iesbelen");
		credenciales.setEmail(doctor.getEmail());
		credenciales.setId_doctor_duenyo(doctor.getId());
		credenciales.setRol("doctor");
		credencialesRepository.save(credenciales);
	}

	public void addDuenyoCredencial(Duenyo duenyo) {
		Credenciales credenciales = new Credenciales();
		credenciales.setContrasenya("iesbelen");
		credenciales.setEmail(duenyo.getEmail());
		credenciales.setId_doctor_duenyo(duenyo.getId());
		credenciales.setRol("duenyo");
		credencialesRepository.save(credenciales);
	}

	public void addCredencial(Credenciales c) {
		credencialesRepository.save(c);
	}

	public Credenciales buildCredencial(RegisterRequest registerRequest, long id, String rol) {
		return Credenciales.builder()
				.email(registerRequest.getEmail())
				.contrasenya(passwordEncoder.encode("iesbelen"))
				.id_doctor_duenyo(id)
				.rol(rol)
				.build();
	}

	public Optional<Credenciales> findCredencialByEmail(String email) {
		return credencialesRepository.getCredencialesByEmail(email);
	}

	public AuthResponse login(UserPassword userPassword) {
		auth.authenticate(
				new UsernamePasswordAuthenticationToken(userPassword.getEmail(), userPassword.getContrasenya()));
		UserDetails user = credencialesRepository.getCredencialesByEmail(userPassword.getEmail()).orElseThrow();
		String token = jwtService.getToken(user);
		return new AuthResponse(token);
	}

	public void removeCredencial(String rol, long id) {
		credencialesRepository.deleteCredencial(rol, id);
	}

	private String returnEncodedPassword(String password) {
		return passwordEncoder.encode(password);
	}

	public void resetCredencialesPassword( Credenciales credenciales) {
		String newEncodePassword = returnEncodedPassword("iesbelen");
		resetPassword(credenciales, newEncodePassword);
		addCredencial(credenciales);
	}

	private void resetPassword(Credenciales credenciales, String newEncodePassword) {
		credenciales.setContrasenya(newEncodePassword);
		credenciales.setChangedPassword(false);
	}

    public void changeCredencialesPassword(ChangePasswordRequest changePasswordRequest, Credenciales credenciales) {
		String password = changePasswordRequest.getContrasenya();
		String newEncodedPassword = returnEncodedPassword(password);
		changePassword(credenciales, newEncodedPassword);
		credencialesRepository.save(credenciales);
    }

	private void changePassword(Credenciales credenciales, String newEncodePassword) {
		credenciales.setContrasenya(newEncodePassword);
		credenciales.setChangedPassword(true);
	}

    public void addSubAdministrador(String email) {
        
    }

	

}
