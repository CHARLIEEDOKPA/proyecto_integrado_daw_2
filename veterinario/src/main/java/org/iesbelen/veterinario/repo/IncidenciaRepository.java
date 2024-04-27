package org.iesbelen.veterinario.repo;

import java.util.List;

import org.iesbelen.veterinario.model.Incidencia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface IncidenciaRepository extends JpaRepository<Incidencia, Long> {

    @Query(value = "SELECT I from Incidencia I where I.id_doctor = %:id%")
    public List<Incidencia> getListIncidenciaByIdDyenyo(@Param("id") long id);

}
