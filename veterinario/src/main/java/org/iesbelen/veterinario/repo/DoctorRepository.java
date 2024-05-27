package org.iesbelen.veterinario.repo;

import java.util.List;
import java.util.Optional;

import org.iesbelen.veterinario.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long>{
    @Modifying
    @Transactional
    @Query("UPDATE Doctor D SET D.activo = false WHERE D.id = :id")
    public void deleteDoctor(@Param("id") Long id);

    @Query("SELECT D FROM Doctor D where D.id = :id and D.activo = true")
    public Optional<Doctor> getActiveDoctor(@Param("id") Long id);

    @Query("SELECT D FROM Doctor D where D.activo = true")
    public List<Doctor> getActiveDoctors();

    @Query("SELECT D from Doctor D where D.id in (SELECT R.id_doctor from Recomendacion R where R.id = :id)")
    public Optional<Doctor> getDoctorByRecomendacion(@Param("id") long id_recomendacion);
}
