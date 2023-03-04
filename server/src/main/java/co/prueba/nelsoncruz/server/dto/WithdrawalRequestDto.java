package co.prueba.nelsoncruz.server.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.Data;

@Data
public class WithdrawalRequestDto {

    private BigDecimal amount;
    private LocalDateTime date;
    private Long userId;
    private String sourceAccount;
    private Long withdrawalPointId;

}