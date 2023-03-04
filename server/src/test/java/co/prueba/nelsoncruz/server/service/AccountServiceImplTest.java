package co.prueba.nelsoncruz.server.service;

import co.prueba.nelsoncruz.server.dto.AccountResponseDto;
import co.prueba.nelsoncruz.server.model.entity.AccountType;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import co.prueba.nelsoncruz.server.model.entity.Customer;
import co.prueba.nelsoncruz.server.model.entity.InternalAccount;
import co.prueba.nelsoncruz.server.model.repository.InternalAccountRepository;
import co.prueba.nelsoncruz.server.service.impl.AccountServiceImpl;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.lenient;

@ExtendWith(MockitoExtension.class)
public class AccountServiceImplTest {

    @Mock
    private InternalAccountRepository internalAccountRepository;

    @InjectMocks
    private AccountServiceImpl accountService;

    @Test
    @DisplayName("Obtener la lista de cuentas para un usuario válido")
    void testGetListAccountsForValidCustomer() {

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

        // Crear un tipo de cuenta (prueba) para ese usuario
        AccountType accountType = new AccountType();
        accountType.setId(1L);
        accountType.setDescription("Ahorros");

        //Crear una cuenta interna (prueba) para el usuario
        InternalAccount account1 = new InternalAccount();
        account1.setId(1L);
        account1.setAccountNumber("1015489425");
        account1.setAvailableBalance(new BigDecimal("765250"));
        account1.setCustomer(user);
        account1.setAccountType(accountType);

        // Crear otra cuenta interna (prueba) para mismo usuario
        InternalAccount account2 = new InternalAccount();
        account2.setId(2L);
        account2.setAccountNumber("1018354896");
        account2.setAvailableBalance(new BigDecimal("15000"));
        account2.setCustomer(user);
        account2.setAccountType(accountType);

        // Añadir las 2 cuentas de prueba creadas a una lista de cuentas internas
        List<InternalAccount> internalAccounts = new ArrayList<>();
        internalAccounts.add(account1);
        internalAccounts.add(account2);

        Long customerId = 1L;

        //Configurar el mock de internalAccountRepository
        lenient().when(internalAccountRepository.findAllByCustomer_Id(customerId)).thenReturn(Optional.of(internalAccounts));

        // Llamar al método a testear
        List<AccountResponseDto> result = accountService.getListAccounts(customerId);

        // Verificar que la respuesta es la correcta
        assertNotNull(result);
        assertEquals(1L, result.get(0).getId());
        assertEquals("Ahorros", result.get(0).getAccountType());
        assertEquals("1015489425", result.get(0).getAccountNumber());
        assertEquals(new BigDecimal("765250"), result.get(0).getAvailableBalance());
        assertEquals(2L, result.get(1).getId());
        assertEquals("Ahorros", result.get(1).getAccountType());
        assertEquals("1018354896", result.get(1).getAccountNumber());
        assertEquals(new BigDecimal("15000"), result.get(1).getAvailableBalance());
    }

    @Test
    @DisplayName("Obtener la lista de cuentas para un usuario inválido")
    void testGetListAccountsForInvalidCustomer() {

        //Configurar el mock de internalAccountRepository
        Long customerId = 9L;
        lenient().when(internalAccountRepository.findAllByCustomer_Id(customerId)).thenReturn(Optional.empty());

        // Llamar al método a testear, se espera que lance una excepción
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            accountService.getListAccounts(customerId);
        });

        // Verificar que el mensaje de la excepción sea el esperado
        String expectedMessage = "No se encontró el punto de retiro asociado";
        String actualMessage = exception.getMessage();
        assertEquals(expectedMessage, actualMessage);

    }

    @Test
    @DisplayName("Obtener la lista de cuentas para un usuario con ID nulo")
    void testGetListAccountsForNullCustomerId() {

        // Verificar que se lance una excepción si customerId es nulo
        NullPointerException exception = assertThrows(
                NullPointerException.class,
                () -> {
                    accountService.getListAccounts(null);
                }
        );

        // Verificar que el mensaje de la excepción sea el esperado
        String expectedMessage = "El id del usuario (cliente) no debe ser nulo";
        String actualMessage = exception.getMessage();
        assertEquals(expectedMessage, actualMessage);
    }
}
