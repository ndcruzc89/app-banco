package co.prueba.nelsoncruz.server.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import co.prueba.nelsoncruz.server.model.entity.Bank;

public interface BankRepository extends JpaRepository <Bank, Long>{
    
    Optional<Bank> findById(Long Bankid);
}
