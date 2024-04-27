package org.iesbelen.veterinario.repo;

import org.iesbelen.veterinario.model.Comentario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComentarioRepository extends JpaRepository<Comentario,Long>{
    
}
