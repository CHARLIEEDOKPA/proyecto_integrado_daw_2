package org.iesbelen.veterinario.repo;

import java.util.List;

import org.iesbelen.veterinario.model.Incidencia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface IncidenciaRepository extends JpaRepository<Incidencia, Long> {

    @Query(value = "SELECT I from Incidencia I where I.id_doctor = %:id%")
    public List<Incidencia> getListIncidenciaByIdDyenyo(@Param("id") long id);

    @Query(value = "SELECT I from Incidencia I where I.id_mascota = %:id%")
    public List<Incidencia> getListIncidenciaByMascota(@Param("id") long id);

    @Query(value = "SELECT I from Incidencia I where I.id_doctor = :id")
    public List<Incidencia> getListIncidenciaByDoctor(@Param("id") long id);

    @Modifying
    @Transactional
    @Query(value = "UPDATE Incidencia I SET I.leido = true where I.id = :id")
    public void readIncidencia(@Param("id") long id);

}
