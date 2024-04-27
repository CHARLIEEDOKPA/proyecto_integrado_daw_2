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
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(
    name = "duenyo",
    schema = "veterinario_proyecto_integrado"
)
public class Duenyo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(nullable = false, length = 50)
    private String apellidos1;

    @Column(nullable = true, length = 50)
    private String apellidos2;

    @Column(nullable = false)
    private String residencia;

    @Column(nullable = false)
    private Date nacimiento;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, length = 9)
    private String telefono;

    @JsonIgnore
    private boolean activo;

     @OneToMany(cascade = CascadeType.ALL)
     @JoinColumn(name = "id_duenyo", referencedColumnName = "id")
    private List<Mascota> mascotas;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_duenyo",referencedColumnName = "id")
    private List<Publicacion> publicaciones;
    
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_duenyo",referencedColumnName = "id")
    private List<MeGusta> megustas;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_duenyo",referencedColumnName = "id")
    private List<Comentario> comentarios;
}
