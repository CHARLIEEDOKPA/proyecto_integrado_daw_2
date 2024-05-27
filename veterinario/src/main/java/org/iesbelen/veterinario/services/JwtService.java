package org.iesbelen.veterinario.services;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.iesbelen.veterinario.model.Credenciales;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    private static final String SECRET_KEY = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";


    public String getSubsTringToken(String bearer) {
        return bearer.substring(7);
    }

    public String getToken(UserDetails credenciales) {
        return getJWT(new HashMap<>(), credenciales);
    }

    private String getJWT(Map<String,Object> hashMap, UserDetails credenciales) {
        Date now =  new Date();
        return Jwts.builder()
        .claim("id", ((Credenciales) credenciales).getId_doctor_duenyo())
        .claim("rol", ((Credenciales) credenciales).getRol())
        .claim("changedPassword",((Credenciales) credenciales).isChangedPassword())
        .setSubject(credenciales.getUsername())
        .setIssuedAt(now)
        .setExpiration(new Date(now.getTime() + (1000*60*60*24)))
        .signWith(getKey(), SignatureAlgorithm.HS256)
        .compact();
    }



    private Key getKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public Long getIdFromToken(String token) {
        Claims claims = getAllClaims(token);
        Object object = claims.get("id");
        return Long.valueOf((Integer) object);
    }

    public String getRolFromToken(String token) {
        Claims claims = getAllClaims(token);
        return (String) claims.get("rol");
    }

    public boolean getChangedPasswordFromToken(String token) {
        Claims claims = getAllClaims(token);
        return (boolean) claims.get("changedPassword");
    }


    public boolean isValid(String token, UserDetails userDetails) {
        String username = getUsernameFromToken(token);
        return username.equals(userDetails.getUsername());
    }

    public String getUsernameFromToken(String token) {
        return getClaim(token, Claims::getSubject);
    }

    private Claims getAllClaims(String token) {
        return Jwts.parserBuilder()
        .setSigningKey(getKey())
        .build().parseClaimsJws(token)
        .getBody();
    }

    public <T> T getClaim(String token, Function<Claims,T> claimsResolver) {
        final Claims claims = getAllClaims(token);
        return claimsResolver.apply(claims);
    }




}
