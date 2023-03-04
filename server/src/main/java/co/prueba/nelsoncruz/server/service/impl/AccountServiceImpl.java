package co.prueba.nelsoncruz.server.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import co.prueba.nelsoncruz.server.dto.AccountResponseDto;
import co.prueba.nelsoncruz.server.model.entity.InternalAccount;
import co.prueba.nelsoncruz.server.model.repository.InternalAccountRepository;
import co.prueba.nelsoncruz.server.service.AccountService;
import java.util.Objects;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final InternalAccountRepository internalAccountRepository;

    @Override
    public List<AccountResponseDto> getListAccounts(Long customerId) {
        
        Objects.requireNonNull(customerId, "El id del usuario (cliente) no debe ser nulo");
        
        List<InternalAccount> userAccounts = internalAccountRepository.findAllByCustomer_Id(customerId)
                .orElseThrow(() -> new IllegalArgumentException("No se encontró ninguna cuenta para el cliente asociado"));
    
        return userAccounts.stream()
                .map(account -> AccountResponseDto.builder()
                        .id(account.getId())
                        .accountType(account.getAccountType().getDescription())
                        .accountNumber(account.getAccountNumber())
                        .availableBalance(account.getAvailableBalance())
                        .build())
                .collect(Collectors.toList());
    }
    

}
