package co.prueba.nelsoncruz.server.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import co.prueba.nelsoncruz.server.model.entity.Bank;
import co.prueba.nelsoncruz.server.model.entity.ExternalAccount;

public interface ExternalAccountRepository extends JpaRepository<ExternalAccount, Long> {
    
    Optional<ExternalAccount> findByAccountNumberAndBank(String accountNumber, Bank bank);
}
