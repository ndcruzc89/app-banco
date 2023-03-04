package co.prueba.nelsoncruz.server.model.entity;

import java.math.BigDecimal;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cuenta_interna")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class InternalAccount {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(name = "num_cuenta", nullable = false, unique = true, length = 20)
    private String accountNumber;

    @Column(name = "saldo_disp", nullable = false)
    private BigDecimal availableBalance;

    @ManyToOne
    @JoinColumn(name = "id_cliente", nullable = false)
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "id_tipocuenta", nullable = false)
    private AccountType accountType;

    @OneToMany(mappedBy = "sourceAccount")
    private List<Transaction> sourceTransactions;

    @OneToMany(mappedBy = "internalDestinationAccount")
    private List<Transaction> destinationTransactions;

}
