package co.prueba.nelsoncruz.server.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import co.prueba.nelsoncruz.server.model.entity.AccountType;

public interface AccountTypeRepository extends JpaRepository<AccountType, Long> {
    
    Optional<AccountType> findById(Long accountTypeId);
}
