package co.prueba.nelsoncruz.server.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import co.prueba.nelsoncruz.server.model.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer,Long> {
    
    Optional<Customer> findByEmailAndPassword(String email, String password);

    Optional<Customer> findById(Long customerId);
}
