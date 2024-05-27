package org.iesbelen.veterinario.repo;

import java.util.List;
import java.util.Optional;

import org.iesbelen.veterinario.model.Duenyo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface DuenyoRepository extends JpaRepository<Duenyo,Long>{
    
    
    @Query("UPDATE Duenyo D SET D.activo = false WHERE D.id = :id")
    @Transactional
    @Modifying()
    public void deleteDuenyo(@Param("id") Long id);

    @Query("SELECT D FROM Duenyo D where D.activo = true")
    public List<Duenyo> getActiveDuenyos(@Param("id") Long id);

    @Query("SELECT D FROM Duenyo D where D.id=:id and D.activo = true")
    public Optional<Duenyo> getActiveDuenyo(@Param("id") Long id);

    @Query("SELECT D FROM Duenyo D where id in (SELECT M.id_duenyo from Mascota M where id = :id_mascota)")
    public Optional<Duenyo>getDuenyoByMascotaId(@Param("id_mascota") Long id_mascota);

    @Query("SELECT D FROM Duenyo D where (LOWER(D.nombre) LIKE (%:pattern%) OR LOWER(D.apellidos1) LIKE %:pattern% OR LOWER(D.apellidos2) LIKE %:pattern%) AND D.activo = true")
    public List<Duenyo> getDuenyosByPattern(@Param("pattern")String pattern);

}
