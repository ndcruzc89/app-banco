package co.prueba.nelsoncruz.server.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import co.prueba.nelsoncruz.server.model.entity.TransactionType;

public interface TransactionTypeRepository extends JpaRepository<TransactionType, Long> {

    Optional<TransactionType> findById(Long transactionTypeId);
}
