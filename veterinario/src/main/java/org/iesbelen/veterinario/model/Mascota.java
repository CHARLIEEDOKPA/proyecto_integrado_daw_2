package org.iesbelen.veterinario.model;

import java.sql.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Entity
@Table(
    name = "mascota",
    schema = "veterinario_proyecto_integrado" 
)
public class Mascota {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, length = 50)
    private String nombre;

    @Column(nullable = false)
    private Date nacimiento;

    @Column(nullable = false, length = 6)
    private String sexo;

    @JsonIgnore
    private long id_doctor;

    @Column(nullable = false)
    private String raza;

    @JsonIgnore
    private long id_duenyo;
    @JsonIgnore
    private boolean activo;


    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_mascota",referencedColumnName = "id")
    private List<Incidencia> incidencias;


    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_mascota",referencedColumnName = "id")
    private List<Recomendacion> recomendaciones;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_mascota",referencedColumnName = "id")
    private List<Cita> citas;

    @Lob
    @Column(columnDefinition = "longblob")
    private String foto;
    

}
