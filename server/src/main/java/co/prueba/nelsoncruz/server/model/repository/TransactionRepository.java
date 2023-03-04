package co.prueba.nelsoncruz.server.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import co.prueba.nelsoncruz.server.model.entity.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    
    
}
