package co.prueba.nelsoncruz.server.model.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "transaccion")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Transaction {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(name = "monto", nullable = false)
    private BigDecimal amount;

    @Column(name = "fecha", nullable = false, columnDefinition = "TIMESTAMP")
    private LocalDateTime date;

    @Column(name = "mismo_banco")
    private Boolean sameBank;

    @ManyToOne
    @JoinColumn(name = "id_cliente", nullable = false)
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "id_cuentaorigen", nullable = false)
    private InternalAccount sourceAccount;

    @ManyToOne
    @JoinColumn(name = "id_tipotransaccion", nullable = false)
    private TransactionType transactionType;

    @ManyToOne
    @JoinColumn(name = "id_cuentadestino_interno", referencedColumnName = "id", nullable = true)
    private InternalAccount internalDestinationAccount;
 
    @ManyToOne
    @JoinColumn(name = "id_cuentadestino_externo", referencedColumnName = "id", nullable = true)
    private ExternalAccount externalDestinationAccount;

    @ManyToOne
    @JoinColumn(name = "id_puntoretiro")
    private WithdrawalPoint withdrawalPoint;

}
