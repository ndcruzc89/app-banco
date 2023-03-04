package co.prueba.nelsoncruz.server.service;

import co.prueba.nelsoncruz.server.dto.DepositRequestDto;
import co.prueba.nelsoncruz.server.dto.WithdrawalRequestDto;

public interface TransactionService {

    void createDeposit(DepositRequestDto deposit);

    void createWithdrawal(WithdrawalRequestDto deposit);
    
}
