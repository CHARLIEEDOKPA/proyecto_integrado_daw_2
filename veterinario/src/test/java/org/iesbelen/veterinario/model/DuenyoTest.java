// package org.iesbelen.veterinario.model;

// import static org.junit.jupiter.api.Assertions.assertEquals;

// import java.sql.Date;
// import java.util.Optional;

// import org.iesbelen.veterinario.repo.DuenyoRepository;
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;

// @SpringBootTest
// public class DuenyoTest {

//     @Autowired
//     private DuenyoRepository duenyoRepository;

//     @Test
//     void Test1() {
//         Duenyo duenyo = new Duenyo(0, "Eduardo", "Edokpa", "Aigbiremhon", "MALAGA", new Date(111), "charlieedokpa@gmail.com", "632110766", false, null);
//         duenyoRepository.save(duenyo);
//     }
   
//     @Test
//     void Test2() {
//         Optional<Duenyo> opt = duenyoRepository.findById(1L);
//         System.out.println(opt.get());
//         assertEquals(1, opt.get().getMascotas().size());
//     }
    
// }
