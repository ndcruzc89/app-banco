package co.prueba.nelsoncruz.server.model.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import co.prueba.nelsoncruz.server.model.entity.AccountType;
import co.prueba.nelsoncruz.server.model.entity.InternalAccount;

public interface InternalAccountRepository extends JpaRepository<InternalAccount, Long> {

    Optional<List<InternalAccount>> findAllByCustomer_Id(Long customerId);

    Optional<InternalAccount> findByAccountNumber(String sourceAccountNumber);

    Optional<InternalAccount> findByAccountNumberAndAccountType(String sourceAccountNumber, AccountType accountType);
}
