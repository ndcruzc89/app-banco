package co.prueba.nelsoncruz.server.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import co.prueba.nelsoncruz.server.dto.UserResponseDto;
import co.prueba.nelsoncruz.server.model.entity.Customer;
import co.prueba.nelsoncruz.server.model.repository.CustomerRepository;
import co.prueba.nelsoncruz.server.service.impl.UserServiceImpl;
import static org.mockito.Mockito.lenient;

@ExtendWith(MockitoExtension.class)
public class UserServiceImplTest {

    @Mock
    private CustomerRepository userRepository;

    @InjectMocks
    private UserServiceImpl userService;

    @Test
    @DisplayName("Test de un usuario con credenciales válidas")
    void testValidateUserValidCredentials() {
        
        // Crear el usuario (cliente) de prueba
        Customer user = new Customer();
        user.setId(1L);
        user.setName("Nelson");
        user.setLastName("Cruz");
        user.setDocument("1012354243");
        user.setEmail("nelsonc89@gmail.com");
        user.setPassword("Nelson123");
        user.setBirthDate(LocalDate.of(1989, 6, 27));
        user.setPhoneNumber("3208330666");
        
        // Configurar el mock de userRepository
        when(userRepository.findByEmailAndPassword("nelsonc89@gmail.com", "Nelson123")).thenReturn(Optional.of(user));

        // Llamar al método a testear
        UserResponseDto response = userService.validateUser("nelsonc89@gmail.com", "Nelson123");

        // Verificar que la respuesta es la correcta
        assertEquals(1L, response.getId());
        assertEquals("Nelson", response.getName());
        assertEquals("Cruz", response.getLastName());
    }
    
    @Test
    @DisplayName("Test de un usuario con credenciales inválidas")
    void testValidateUserInvalidCredentials() {
        // Configurar el mock de userRepository
        lenient().when(userRepository.findByEmailAndPassword("nelsonc89@gmail.com", "Nel")).thenReturn(Optional.empty());

        // Llamar al método a testear, se espera que lance una excepción
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            userService.validateUser("nelsonc89@gmail.com", "Nel");
        });
    
        // Verificar que el mensaje de la excepción sea el esperado
        String expectedMessage = "Credenciales inválidas";
        String actualMessage = exception.getMessage();
        assertEquals(expectedMessage, actualMessage);
    }
    
    @Test
    @DisplayName("Test de un usuario con email nulo")
    void testValidateUserNullEmail() {

        // Verificar que se lance una excepción
        NullPointerException exception = assertThrows(
                NullPointerException.class,
                () -> {
                    userService.validateUser(null,"Nelson123");
                }
        );

        // Verificar que el mensaje de la excepción sea el esperado
        String expectedMessage = "El email no debe ser nulo";
        String actualMessage = exception.getMessage();
        assertEquals(expectedMessage, actualMessage);
    }
    
        @Test
         @DisplayName("Test de un usuario con password nulo")
        void testValidateUserNullPassword() {

        // Verificar que se lance una excepción
        NullPointerException exception = assertThrows(
                NullPointerException.class,
                () -> {
                    userService.validateUser("nelsonc89@gmail.com",null);
                }
        );

        // Verificar que el mensaje de la excepción sea el esperado
        String expectedMessage = "La contraseña no debe ser nula";
        String actualMessage = exception.getMessage();
        assertEquals(expectedMessage, actualMessage);
    }
}
