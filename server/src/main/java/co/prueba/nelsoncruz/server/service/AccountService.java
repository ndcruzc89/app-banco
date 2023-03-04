package co.prueba.nelsoncruz.server.service;

import java.util.List;

import co.prueba.nelsoncruz.server.dto.AccountResponseDto;

public interface AccountService {

    List<AccountResponseDto> getListAccounts(Long customerId);
    
}
