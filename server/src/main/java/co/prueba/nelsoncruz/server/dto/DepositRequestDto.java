package co.prueba.nelsoncruz.server.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.Data;

@Data
public class DepositRequestDto {
    private BigDecimal amount;
    private LocalDateTime date;
    private Boolean sameBank;
    private Long userId;
    private String sourceAccount;
    private Long accountType;
    private String destinationAccount;
    private Long bankId;

}
