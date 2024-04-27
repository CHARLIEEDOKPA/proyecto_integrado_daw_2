package org.iesbelen.veterinario.repo;

import java.util.List;

import org.iesbelen.veterinario.model.Publicacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface PublicacionRepository extends JpaRepository<Publicacion,Long>{
    
    @Query("SELECT P from Publicacion P where P.id_duenyo = :id_duenyo")
    public List<Publicacion> getPublicacionesByIdDuenyo(@Param("id_duenyo") Long id);

    @Modifying
    @Transactional
    @Query("DELETE FROM  Publicacion P WHERE P.id_duenyo = :id_duenyo")
    public void deletePublicacionesByDuenyo(@Param("id_duenyo") Long id);

}
