package co.prueba.nelsoncruz.server.service;

import co.prueba.nelsoncruz.server.dto.DepositRequestDto;
import co.prueba.nelsoncruz.server.dto.WithdrawalRequestDto;
import co.prueba.nelsoncruz.server.model.entity.AccountType;
import co.prueba.nelsoncruz.server.model.entity.Bank;
import co.prueba.nelsoncruz.server.model.entity.Customer;
import co.prueba.nelsoncruz.server.model.entity.ExternalAccount;
import co.prueba.nelsoncruz.server.model.entity.InternalAccount;
import co.prueba.nelsoncruz.server.model.entity.Transaction;
import co.prueba.nelsoncruz.server.model.entity.TransactionType;
import co.prueba.nelsoncruz.server.model.entity.WithdrawalPoint;
import co.prueba.nelsoncruz.server.model.repository.AccountTypeRepository;
import co.prueba.nelsoncruz.server.model.repository.BankRepository;
import co.prueba.nelsoncruz.server.model.repository.CustomerRepository;
import co.prueba.nelsoncruz.server.model.repository.ExternalAccountRepository;
import co.prueba.nelsoncruz.server.model.repository.InternalAccountRepository;
import co.prueba.nelsoncruz.server.model.repository.TransactionRepository;
import co.prueba.nelsoncruz.server.model.repository.TransactionTypeRepository;
import co.prueba.nelsoncruz.server.model.repository.WithdrawalPointRepository;
import co.prueba.nelsoncruz.server.service.impl.TransactionServiceImpl;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class TransactionServiceImplTest {

    @Mock
    private AccountTypeRepository accountTypeRepository;

    @Mock
    private BankRepository bankRepository;

    @Mock
    private CustomerRepository customerRepository;

    @Mock
    private ExternalAccountRepository externalAccountRepository;

    @Mock
    private InternalAccountRepository internalAccountRepository;

    @Mock
    private TransactionRepository transactionRepository;

    @Mock
    private TransactionTypeRepository transactionTypeRepository;

    @Mock
    private WithdrawalPointRepository withdrawalPointRepository;

    @InjectMocks
    private TransactionServiceImpl transactionService;

    private Customer user;

    private InternalAccount sourceAccount;

    private InternalAccount internalDestinationAccount;

    private AccountType accountType;

    private TransactionType depositTransactionType;

    private TransactionType withdrawalTransactionType;

    private Bank bank;

    private ExternalAccount externalDestinationAccount;
    
    private WithdrawalPoint withdrawalPoint;

    @BeforeEach
    public void setUp() {

        // Crear el usuario (cliente) de prueba
        user = new Customer();
        user.setId(1L);
        user.setName("Nelson");
        user.setLastName("Cruz");
        user.setDocument("1012354243");
        user.setEmail("nelsonc89@gmail.com");
        user.setPassword("Nelson123");
        user.setBirthDate(LocalDate.of(1989, 6, 27));
        user.setPhoneNumber("3208330666");

        // Crear un tipo de cuenta (prueba) para ese usuario
        accountType = new AccountType();
        accountType.setId(1L);
        accountType.setDescription("Ahorros");

        //Crear una cuenta de origen interna (prueba) para el usuario
        sourceAccount = new InternalAccount();
        sourceAccount.setId(1L);
        sourceAccount.setAccountNumber("1015489425");
        sourceAccount.setAvailableBalance(new BigDecimal("765250"));
        sourceAccount.setCustomer(user);
        sourceAccount.setAccountType(accountType);

        //Crear una cuenta de destino interna (prueba) para el usuario
        internalDestinationAccount = new InternalAccount();
        internalDestinationAccount.setId(2L);
        internalDestinationAccount.setAccountNumber("1018354896");
        internalDestinationAccount.setAvailableBalance(new BigDecimal("15000"));
        internalDestinationAccount.setCustomer(user);
        internalDestinationAccount.setAccountType(accountType);

        depositTransactionType = new TransactionType();
        depositTransactionType.setId(1L);
        depositTransactionType.setDescription("Deposito");

        bank = new Bank();
        bank.setId(1L);
        bank.setName("Banco Caja Social");

        externalDestinationAccount = new ExternalAccount();
        externalDestinationAccount.setId(1L);
        externalDestinationAccount.setAccountNumber("1114865965");
        externalDestinationAccount.setBank(bank);
        
        withdrawalTransactionType = new TransactionType();
        withdrawalTransactionType.setId(2L);
        withdrawalTransactionType.setDescription("Retiro");
        
        
        withdrawalPoint = new WithdrawalPoint();
        withdrawalPoint.setId(1L);
        withdrawalPoint.setName("Grupo Exito");
    }

    @Test
    @DisplayName("Test para crear un depósito con una cuenta interna")
    void createDeposit_withInternalDestinationAccount_shouldCreateTransaction() {

        DepositRequestDto deposit = new DepositRequestDto();
        deposit.setAmount(new BigDecimal("15000.80"));
        deposit.setDate(LocalDateTime.now());
        deposit.setSameBank(true);
        deposit.setUserId(1L);
        deposit.setSourceAccount("1015489425");
        deposit.setAccountType(1L);
        deposit.setDestinationAccount("1018354896");

        //Llamar al método que configura el mock de customerRepository
        mockCustomerRepository(1L, user);

        //Llamar al método que configura el mock de internalAccountRepository para sourceAccount
        mockInternalSourceAccountRepository("1015489425", sourceAccount);

        //Llamar al método que configura el mock de transactionTypeRepository
        mockTransactionTypeRepository(1L, depositTransactionType);

        //Llamar al método que configura el mock de accountTypeRepository
        mockAccountTypeRepository(1L, accountType);

        //Llamar al método que configura el mock de internalAccountRepository para internalDestinationAccount
        mockInternalDestinationAccountRepository("1018354896", accountType, internalDestinationAccount);

        // Llamar al método a testear
        transactionService.createDeposit(deposit);

        // Verificar que la respuesta es la correcta
        verify(transactionRepository, times(1)).save(any(Transaction.class));
    }

    @Test
    @DisplayName("Test para crear un depósito con una cuenta externa")
    void createDeposit_withExternalDestinationAccount_shouldCreateTransaction() {

        DepositRequestDto deposit = new DepositRequestDto();
        deposit.setAmount(new BigDecimal("15000.80"));
        deposit.setDate(LocalDateTime.now());
        deposit.setSameBank(false);
        deposit.setUserId(1L);
        deposit.setSourceAccount("1015489425");
        deposit.setAccountType(1L);
        deposit.setDestinationAccount("1114865965");
        deposit.setBankId(1L);

        //Llamar al método que configura el mock de customerRepository
        mockCustomerRepository(1L, user);

        //Llamar al método que configura el mock de internalAccountRepository para sourceAccount
        mockInternalSourceAccountRepository("1015489425", sourceAccount);

        //Llamar al método que configura el mock de transactionTypeRepository
        mockTransactionTypeRepository(1L, depositTransactionType);

        //Llamar al método que configura el mock de bankRepository
        mockBank(1L, bank);

        //Llamar al método que configura el mock de externalAccountRepository
        mockExternalDestinationAccountRepository("1114865965", bank, externalDestinationAccount);

        // Llamar al método a testear
        transactionService.createDeposit(deposit);

        // Verificar que la respuesta es la correcta
        verify(transactionRepository, times(1)).save(any(Transaction.class));
    }
    
    
    @Test
    @DisplayName("Test para crear un retiro")
    void createWithdrawal_shouldCreateTransaction() {
        WithdrawalRequestDto withdrawal = new WithdrawalRequestDto();
        withdrawal.setAmount(new BigDecimal("25000"));
        withdrawal.setDate(LocalDateTime.now());
        withdrawal.setUserId(1L);
        withdrawal.setSourceAccount("1015489425");
        withdrawal.setWithdrawalPointId(1L);
        
         //Llamar al método que configura el mock de customerRepository
        mockCustomerRepository(1L, user);

        //Llamar al método que configura el mock de internalAccountRepository para sourceAccount
        mockInternalSourceAccountRepository("1015489425", sourceAccount);

        //Llamar al método que configura el mock de transactionTypeRepository
        mockTransactionTypeRepository(2L, withdrawalTransactionType);
        
        mockWithdrawalRepository(1L, withdrawalPoint);
        
        // Llamar al método a testear
        transactionService.createWithdrawal(withdrawal);
        
        // Verificar que la respuesta es la correcta
        verify(transactionRepository, times(1)).save(any(Transaction.class));
    }

    //Configurar el mock de customerRepository
    private void mockCustomerRepository(Long userId, Customer user) {
        lenient().when(customerRepository.findById(userId)).thenReturn(Optional.of(user));
    }

    //Configurar el mock de internalAccountRepository para sourceAccount
    private void mockInternalSourceAccountRepository(String accountNumber, InternalAccount internalAccount) {
        lenient().when(internalAccountRepository.findByAccountNumber(accountNumber))
                .thenReturn(Optional.of(internalAccount));
    }

    ///Configurar el mock de transactionTypeRepository
    private void mockTransactionTypeRepository(Long transactionTypeId, TransactionType transactionType) {
        lenient().when(transactionTypeRepository.findById(transactionTypeId))
                .thenReturn(Optional.of(transactionType));
    }

    ///Configurar el mock de accountTypeRepository
    private void mockAccountTypeRepository(Long accountTypeId, AccountType accountType) {
        lenient().when(accountTypeRepository.findById(accountTypeId))
                .thenReturn(Optional.of(accountType));
    }

    //Configurar el mock de internalAccountRepository para internalDestinationAccount
    private void mockInternalDestinationAccountRepository(String accountNumber, AccountType accountType, InternalAccount internalDestinationAccount) {
        lenient().when(internalAccountRepository.findByAccountNumberAndAccountType(accountNumber, accountType))
                .thenReturn(Optional.of(internalDestinationAccount));
    }

    //Configurar el mock de bankRepository
    private void mockBank(Long bankId, Bank bank) {
        lenient().when(bankRepository.findById(bankId))
                .thenReturn(Optional.of(bank));
    }

    //Configurar el mock de externalAccountRepository para externalDestinationAccount
    private void mockExternalDestinationAccountRepository(String accountNumber, Bank bank, ExternalAccount externalAccount) {
        lenient().when(externalAccountRepository.findByAccountNumberAndBank(accountNumber, bank))
                .thenReturn(Optional.of(externalAccount));
    }
    
    
    //Configurar el mock de withdrawalRepository
    private void mockWithdrawalRepository(Long withdrawalPointId, WithdrawalPoint withdrawalPoint) {
        lenient().when(withdrawalPointRepository.findById(withdrawalPointId))
                .thenReturn(Optional.of(withdrawalPoint));
    }

}
