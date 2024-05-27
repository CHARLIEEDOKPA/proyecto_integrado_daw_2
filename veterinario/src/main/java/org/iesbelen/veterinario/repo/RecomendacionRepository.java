package org.iesbelen.veterinario.repo;

import java.util.List;

import org.iesbelen.veterinario.model.Recomendacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface RecomendacionRepository extends JpaRepository<Recomendacion,Long>{
    

    @Query(value = "SELECT R FROM Recomendacion R where R.id_mascota IN (SELECT M.id from Mascota M where M.id_duenyo = :id_duenyo)")
    public List<Recomendacion> getRecomendacionesByDuenyo(@Param("id_duenyo") long id_duenyo);
    @Modifying
    @Transactional
    @Query(value = "UPDATE Recomendacion R SET R.leido = true WHERE R.id = :id")
    public void readRecomendacion(@Param("id") Long id_recomendacion);
}
