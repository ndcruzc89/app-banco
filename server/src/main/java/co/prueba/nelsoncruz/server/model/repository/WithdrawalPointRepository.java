package co.prueba.nelsoncruz.server.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import co.prueba.nelsoncruz.server.model.entity.WithdrawalPoint;

public interface WithdrawalPointRepository extends JpaRepository<WithdrawalPoint, Long> {
    
    Optional<WithdrawalPoint> findById(Long withdrawalId);
}
