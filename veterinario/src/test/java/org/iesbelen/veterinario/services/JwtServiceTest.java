// package org.iesbelen.veterinario.services;

// import static org.junit.jupiter.api.Assertions.assertAll;
// import static org.junit.jupiter.api.Assertions.assertEquals;

// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;
// @SpringBootTest
// public class JwtServiceTest {

//     @Autowired
//     JwtService jwtService;

//     String token = "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MCwicm9sIjoiYWRtaW5pc3RyYWRvciIsInN1YiI6ImNoYXJsaWVlZG9rcGFAZ21haWwuY29tIiwiaWF0IjoxNzEzMDE2MDg2LCJleHAiOjE3MTMxMDI0ODZ9.MYB5l-Be7ESWDS2ANgVgThthIZ33Df1PD6vFueOGZpE";

//     @Test
//     void testGetIdFromToken() {
//         assertEquals(0,jwtService.getIdFromToken(token));
//     }

//     @Test
//     void testGetRolFromToken() {
//         assertEquals("administrador",jwtService.getRolFromToken(token));
//     }
// }
