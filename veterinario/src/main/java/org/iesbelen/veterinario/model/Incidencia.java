package org.iesbelen.veterinario.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(
    name = "incidencia",
    schema = "veterinario_proyecto_integrado"
)
public class Incidencia {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private LocalDateTime fecha;
    
    @Column(nullable = false)
    private long id_mascota;
    @JsonIgnore
    @Column(nullable = false)
    private long id_doctor;
    @Column(nullable = false,length = 1500)
    private String observaciones;

    @Column(nullable = false)
    private boolean leido;

     @PrePersist
    public void prePersist() {
        fecha = LocalDateTime.now();
    }


}
