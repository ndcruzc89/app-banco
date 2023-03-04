package co.prueba.nelsoncruz.server.dto;

import java.math.BigDecimal;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class AccountResponseDto {
    private Long id;
    private String accountType;
    private String accountNumber;
    private BigDecimal availableBalance;

}
