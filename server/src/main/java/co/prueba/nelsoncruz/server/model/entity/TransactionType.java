package co.prueba.nelsoncruz.server.model.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tipo_transaccion")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionType {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(name = "descripcion", nullable = false, length = 20)
    private String description;

    @OneToMany(mappedBy = "transactionType")
    private List<Transaction> transactions;
}
