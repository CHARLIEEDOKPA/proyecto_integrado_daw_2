package org.iesbelen.veterinario.repo;

import org.iesbelen.veterinario.model.Recomendacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecomendacionRepository extends JpaRepository<Recomendacion,Long>{
    
}
