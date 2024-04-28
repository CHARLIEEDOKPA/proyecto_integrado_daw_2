package org.iesbelen.veterinario.repo;

import java.util.List;
import java.util.Optional;

import org.iesbelen.veterinario.model.Mascota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


@Repository
public interface MascotaRepository extends JpaRepository<Mascota,Long>{
    @Modifying
    @Transactional
    @Query("UPDATE Mascota M SET M.activo = false WHERE M.id = :id")
    public void deleteMascota(@Param("id") Long id);

    @Modifying
    @Transactional
    @Query("UPDATE Mascota M SET M.activo = false WHERE M.id_duenyo = :id_duenyo")
    public void deleteMascotasByDuenyo(@Param("id_duenyo") Long id);

    @Query("SELECT M from Mascota M where M.id = :id and M.activo = true")
    public Optional<Mascota> getMascotaById(@Param("id") long id);

    @Query("SELECT M from Mascota M where M.id_doctor = :id and M.activo = true")
    public List<Mascota> getMascotasByDoctor(@Param("id") long id);

    @Query("SELECT M from Mascota M where M.activo = true")
    public List<Mascota> getAllActiveMascotas();

    @Query("SELECT M from Mascota M where M.id_duenyo = :id_duenyo and M.activo = true")
    public List<Mascota> getMascotasByDuenyo(@Param("id_duenyo") long id);
 }
