package co.prueba.nelsoncruz.server.service.impl;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Objects;

import org.springframework.stereotype.Service;

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
import co.prueba.nelsoncruz.server.service.TransactionService;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TransactionServiceImpl implements TransactionService {

    private final AccountTypeRepository accountTypeRepository;
    private final BankRepository bankRepository;
    private final CustomerRepository customerRepository;
    private final ExternalAccountRepository externalAccountRepository;
    private final InternalAccountRepository internalAccountRepository;
    private final TransactionRepository transactionRepository;
    private final TransactionTypeRepository transactionTypeRepository;
    private final WithdrawalPointRepository withdrawalPointRepository;

    // Crear la transacción de tipo depósito
    @Override
    public void createDeposit(DepositRequestDto deposit) {
        validateFields(deposit.getAmount(), "monto a depositar");
        validateFields(deposit.getDate(), "fecha");
        validateFields(deposit.getSameBank(), "verificación si es o no el mismo banco");
        validateFields(deposit.getUserId(), "id de usuario");
        validateFields(deposit.getSourceAccount(), "cuenta origen");
        validateFields(deposit.getAccountType(), "tipo de cuenta");
        validateFields(deposit.getDestinationAccount(), "cuenta destino");

        var customer = getCustomer(deposit.getUserId());

        var sourceAccount = getSourceAccount(deposit.getSourceAccount());

        var transactionType = getTransactionType((long) 1);

        if (deposit.getSameBank()) {

            var accountType = getAccountType(deposit.getAccountType());

            var internalDestinationAccount = getInternalDestinationAccount(deposit.getDestinationAccount(),
                    accountType);

            validateAmountToDeposit(deposit.getAmount(), sourceAccount.getAvailableBalance());

            validateDestinationAccount(deposit.getSourceAccount(), deposit.getDestinationAccount());

            sourceAccount.setAvailableBalance(sourceAccount.getAvailableBalance().subtract(deposit.getAmount()));

            internalDestinationAccount.setAvailableBalance(internalDestinationAccount.getAvailableBalance().add(deposit.getAmount()));

            createTransaction(deposit.getAmount(), deposit.getDate(), deposit.getSameBank(), customer, sourceAccount,
                    transactionType, internalDestinationAccount, null,
                    null);

        } else {

            validateFields(deposit.getBankId(), "id del banco");

            var bank = getBank(deposit.getBankId());

            var externalDestinationAccount = getOrCreateExternalDestinationAccount(deposit.getDestinationAccount(),
                    bank);
            
            validateAmountToDeposit(deposit.getAmount(), sourceAccount.getAvailableBalance());

            sourceAccount.setAvailableBalance(sourceAccount.getAvailableBalance().subtract(deposit.getAmount()));

            createTransaction(deposit.getAmount(), deposit.getDate(), deposit.getSameBank(), customer, sourceAccount,
                    transactionType, null, externalDestinationAccount,
                    null);
        }
    }

    // Crear la transacción de tipo retiro
    @Override
    public void createWithdrawal(WithdrawalRequestDto withdrawal) {

        validateFields(withdrawal.getAmount(), "monto a retirar");
        validateFields(withdrawal.getDate(), "fecha");
        validateFields(withdrawal.getUserId(), "id de usuario");
        validateFields(withdrawal.getSourceAccount(), "cuenta origen");
        validateFields(withdrawal.getWithdrawalPointId(), "id punto de retiro");

        var customer = getCustomer(withdrawal.getUserId());

        var sourceAccount = getSourceAccount(withdrawal.getSourceAccount());

        var transactionType = getTransactionType((long) 2);

        var withdrawalPoint = getWithdrawalPoint(withdrawal.getWithdrawalPointId());

        validateAmountToWithdrawal(withdrawal.getAmount(), sourceAccount.getAvailableBalance());

        sourceAccount.setAvailableBalance(sourceAccount.getAvailableBalance().subtract(withdrawal.getAmount()));

        createTransaction(withdrawal.getAmount(), withdrawal.getDate(), null, customer, sourceAccount, transactionType,
                null, null,
                withdrawalPoint);
    }

    // Valida que los campos no sean nulos
    public <T> void validateFields(T field, String message) {
        Objects.requireNonNull(field, "El campo " + message + " no puede ser nulo");
    }

    // Obtiene el cliente asociado
    public Customer getCustomer(Long userId) {

        return customerRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("No se encontró el cliente asociado"));
    }

    // Obtiene la cuenta interna de origen asociada
    public InternalAccount getSourceAccount(String sourceAccount) {

        return internalAccountRepository.findByAccountNumber(sourceAccount)
                .orElseThrow(() -> new IllegalArgumentException("No se encontró la cuenta interna de origen asociada"));
    }

    // Obtiene el tipo de transacción asociado
    public TransactionType getTransactionType(Long id) {

        return transactionTypeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("No se encontró el tipo de transacción asociada"));
    }

    // Obtiene el tipo de cuenta de destino interna asociada
    public AccountType getAccountType(Long accountTypeId) {
        return accountTypeRepository.findById(accountTypeId)
                .orElseThrow(() -> new IllegalArgumentException("No se encontró el tipo de cuenta asociada"));
    }

    // Obtiene la cuenta interna de destino asociada
    public InternalAccount getInternalDestinationAccount(String destinationAccountNumber, AccountType accountType) {
        return internalAccountRepository.findByAccountNumberAndAccountType(destinationAccountNumber, accountType)
                .orElseThrow(
                        () -> new IllegalArgumentException("No se encontró la cuenta interna de destino asociada"));
    }

    // Obtiene el banco de destino asociado
    public Bank getBank(Long bankId) {
        return bankRepository.findById(bankId)
                .orElseThrow(() -> new IllegalArgumentException("No se encontró el banco a la cuenta asociada"));
    }

    // Obtiene la cuenta externa asociada o sino la crea.
    public ExternalAccount getOrCreateExternalDestinationAccount(String destinationAccount, Bank bank) {
        return externalAccountRepository.findByAccountNumberAndBank(destinationAccount, bank)
                .orElseGet(() -> {
                    var newExternalAccount = new ExternalAccount();
                    newExternalAccount.setAccountNumber(destinationAccount);
                    newExternalAccount.setBank(bank);
                    return externalAccountRepository.save(newExternalAccount);
                });
    }

    // Obtiene el punto de retiro asociado.
    public WithdrawalPoint getWithdrawalPoint(Long withdrawalPointId) {
        return withdrawalPointRepository.findById(withdrawalPointId)
                .orElseThrow(() -> new IllegalArgumentException("No se encontró el punto de retiro asociado"));
    }

    // Valida el monto a depositar
    private void validateAmountToDeposit(BigDecimal amount, BigDecimal availableBalance) {
        if (amount.compareTo(BigDecimal.valueOf(1000)) < 0 || amount.compareTo(availableBalance) > 0) {
            throw new IllegalArgumentException("El monto a depositar es incorrecto");
        }
    }

    // Valida que el número de cuenta destino no sea igual al número de cuenta de origen
    private void validateDestinationAccount(String sourceAccountNumber, String destinationAccountNumber) {
        if (sourceAccountNumber.trim().equals(destinationAccountNumber.trim())) {
            throw new IllegalArgumentException(
                    "El número de cuenta de destino no puede ser igual al número de cuenta de origen");
        }
    }

    // Valida el monto a retirar
    private void validateAmountToWithdrawal(BigDecimal amount, BigDecimal availableBalance) {
        if (amount.compareTo(BigDecimal.valueOf(20000)) < 0 || amount.compareTo(availableBalance) > 0) {
            throw new IllegalArgumentException("El monto a retirar es incorrecto");
        }
    }

    // Crea una nueva transacción (Depósito o Retiro)
    private void createTransaction(BigDecimal amount, LocalDateTime date, Boolean sameBank, Customer customer,
            InternalAccount sourceAccount,
            TransactionType transactionType, InternalAccount internalDestinationAccount,
            ExternalAccount externalDestinationAccount, WithdrawalPoint withdrawalPoint) {

        var newDeposit = new Transaction();
        newDeposit.setAmount(amount);
        newDeposit.setDate(date);
        newDeposit.setSameBank(sameBank);
        newDeposit.setCustomer(customer);
        newDeposit.setSourceAccount(sourceAccount);
        newDeposit.setTransactionType(transactionType);
        newDeposit.setInternalDestinationAccount(internalDestinationAccount);
        newDeposit.setExternalDestinationAccount(externalDestinationAccount);
        newDeposit.setWithdrawalPoint(withdrawalPoint);
        transactionRepository.save(newDeposit);
    }

}
