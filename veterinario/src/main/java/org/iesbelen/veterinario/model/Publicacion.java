package org.iesbelen.veterinario.model;

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
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(
    name = "publicacion",
    schema = "veterinario_proyecto_integrado"
)
public class Publicacion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column( nullable = false, length = 3000 )
    private String photo_url;

    @Column(nullable = true, length = 1000)
    private String descripcion;

    @JsonIgnore
    private long id_duenyo;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_publicacion",referencedColumnName = "id")
    private List<MeGusta> megustas;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_publicacion",referencedColumnName = "id")
    private List<Comentario> comentarios;

    private boolean activo;
    

    

}
