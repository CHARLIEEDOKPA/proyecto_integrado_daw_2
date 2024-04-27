package org.iesbelen.veterinario.repo;

import org.iesbelen.veterinario.model.MeGusta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MeGustaRepository extends JpaRepository<MeGusta,Long> {
    
    @Query("DELETE from MeGusta M where M.id_duenyo = %:id_duenyo% and M.id_publicacion = %:id_publicacion%")
    public void noMeGusta(@Param("id_duenyo") Long id_duenyo, @Param("id_publicacion") Long id_publicacion);

}
