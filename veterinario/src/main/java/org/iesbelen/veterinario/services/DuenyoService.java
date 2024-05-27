package org.iesbelen.veterinario.services;

import java.util.List;
import java.util.Optional;

import org.iesbelen.veterinario.model.Duenyo;
import org.iesbelen.veterinario.repo.DuenyoRepository;
import org.iesbelen.veterinario.requests.DuenyoEditRequest;
import org.iesbelen.veterinario.requests.RegisterRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.validation.Valid;

@Service
public class DuenyoService {

    @Autowired
    private DuenyoRepository duenyoRepository;

    @Autowired 
    private MascotaService mascotaService;

    @Autowired
    private PublicacionService publicacionService;

    @Autowired
    private CredencialesService credencialesService;


    public Duenyo addDuenyo(Duenyo duenyo){
        return duenyoRepository.save(duenyo);
    }

    public List<Duenyo> getListDuenyo() {
        return duenyoRepository.getActiveDuenyos(null);
    }

    public boolean deleteDuenyo(long id) {
        Optional<Duenyo> opt = duenyoRepository.getActiveDuenyo(id);
        if (opt.isPresent()) {
            duenyoRepository.deleteDuenyo(id);
                 removeOthers(id);
                return true;
        }
        return false;
    }

    private void removeOthers(long id) {
        mascotaService.deleteMascotasByDuenyo(id);
        publicacionService.deletePublicacionesByDuenyo(id);
        credencialesService.removeCredencial("duenyo", id);
    }

    public Duenyo buildDuenyo(RegisterRequest registerRequest) {
        return Duenyo.builder().activo(true)
        .nombre(registerRequest.getNombre())
        .apellidos1(registerRequest.getApellidos1())
        .apellidos2(registerRequest.getApellidos2())
        .email(registerRequest.getEmail())
        .nacimiento(registerRequest.getNacimiento())
        .residencia(registerRequest.getResidencia())
        .foto(registerRequest.getFoto())
        .telefono(registerRequest.getTelefono())
        .build();
    }


    public boolean modifyDuenyo(Long id, Duenyo duenyo) {
        Optional<Duenyo> opt = duenyoRepository.findById(id);
        if (opt.isPresent()) {
            boolean equals =  id.equals(duenyo.getId());
            if (equals) {
                duenyoRepository.save(duenyo);
            }
            return equals;
        }
        return false;
        
    }

    public Optional<Duenyo> getDuenyoById(long id) {
        return duenyoRepository.getActiveDuenyo(id);
    }

    public Duenyo editDuenyo(@Valid DuenyoEditRequest duenyoEditRequest, Long id) {
        Optional<Duenyo> opt = getDuenyoById(id);
        if (opt.isPresent()) {
            Duenyo duenyo = opt.get();
            if (id.equals(duenyoEditRequest.getId()) && duenyoEditRequest.getEmail().equals(duenyo.getEmail())) {
                Duenyo editedDuenyo = buildDuenyoForEdit(duenyoEditRequest,duenyo);
                duenyoRepository.save(editedDuenyo);
                return editedDuenyo;
            }
        }
        return null;
    }

    public Duenyo buildDuenyoForEdit(DuenyoEditRequest duenyoEditRequest, Duenyo duenyo) {
        return Duenyo.builder()
        .id(duenyoEditRequest.getId())
        .nombre(duenyoEditRequest.getNombre())
        .apellidos1(duenyoEditRequest.getApellidos1())
        .apellidos2(duenyoEditRequest.getApellidos2())
        .email(duenyoEditRequest.getEmail())
        .activo(true)
        .nacimiento(duenyoEditRequest.getNacimiento())
        .residencia(duenyoEditRequest.getResidencia())
        .telefono(duenyoEditRequest.getTelefono())
        .comentarios(duenyo.getComentarios())
        .megustas(duenyo.getMegustas())
        .publicaciones(duenyo.getPublicaciones())
        .mascotas(duenyo.getMascotas())
        .foto(duenyoEditRequest.getFoto())
        .build();
    }

    public Optional<Duenyo>getDuenyoByMascotaId(Long id_mascota) {
        return duenyoRepository.getDuenyoByMascotaId(id_mascota);
    }

    public Optional<Duenyo> getDuenyoByIncidenciaId(long id) {
        return duenyoRepository.getDuenyoByMascotaId(id);
    }

    public List<Duenyo> getDuenyosByPattern(String pattern) {
        return duenyoRepository.getDuenyosByPattern(pattern);
    }


    
}
