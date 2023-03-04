package co.prueba.nelsoncruz.server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.prueba.nelsoncruz.server.dto.DepositRequestDto;
import co.prueba.nelsoncruz.server.dto.WithdrawalRequestDto;
import co.prueba.nelsoncruz.server.service.TransactionService;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("api/transaction")
public class TransactionController {

    private TransactionService transactionService;

    @PostMapping("/deposit")
    public ResponseEntity<?> createDeposit(@RequestBody DepositRequestDto deposit) {
        try {
            transactionService.createDeposit(deposit);
            return ResponseEntity.ok().body("Depósito exitoso");
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ex.getMessage());
        }
    }

    @PostMapping("/withdrawal")
    public ResponseEntity<?> createWithdrawal(@RequestBody WithdrawalRequestDto withdrawal) {
        try {
            transactionService.createWithdrawal(withdrawal);
            return ResponseEntity.ok().body("Retiro exitoso");
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ex.getMessage());
        }
    }
    
}
