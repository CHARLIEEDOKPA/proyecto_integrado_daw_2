package org.iesbelen.veterinario.repo;

import java.util.List;
import java.util.Optional;

import org.iesbelen.veterinario.model.Cita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository

public interface CitaRepository extends JpaRepository<Cita, Long> {

    @Query(value = "SELECT C from Cita C where C.id_mascota = %:id%")
    public List<Cita> getCitasByIdMascota(@Param("id") long id);

    @Query(value = "SELECT C from Cita C where C.id_doctor = %:id%")
    public List<Cita> getCitasByIdDoctor(@Param("id") long id);

    @Query(value = "SELECT C from Cita C where C.id_mascota in (SELECT M.id from Mascota M WHERE M.id_duenyo = %:id%)")
    public List<Cita> getCitasByDuenyo(@Param("id") long id);

    @Query(value = "SELECT C from Cita C where C.time = %:time% AND C.date = %:date% and C.id_doctor = %:id_doctor%")
    public Optional<Cita> getCitaByDateTime(@Param("time")String time,@Param("date")String date, @Param("id_doctor") long id_doctor);

}
