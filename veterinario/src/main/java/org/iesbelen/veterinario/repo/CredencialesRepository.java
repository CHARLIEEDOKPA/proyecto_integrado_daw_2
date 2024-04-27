package org.iesbelen.veterinario.repo;

import java.util.Optional;

import org.iesbelen.veterinario.model.Credenciales;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface CredencialesRepository extends JpaRepository<Credenciales,Long>{
    
    @Query(value = "select C from Credenciales C where C.email = %:email%")
    public Optional<Credenciales> getCredencialesByEmail(@Param("email")String email);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM Credenciales C where C.rol = :rol and C.id_doctor_duenyo = :id ")
    public void deleteCredencial(@Param("rol")String rol,@Param("id") Long id);


}
