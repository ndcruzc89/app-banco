package co.prueba.nelsoncruz.server.model.entity;

import java.time.LocalDate;
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
@Table(name = "cliente")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Customer {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", nullable = false, length = 50)
    private String name;

    @Column(name = "apellido", nullable = false, length = 50)
    private String lastName;

    @Column(name = "documento", nullable = false, length = 20, unique = true)
    private String document;

    @Column(name = "email", nullable = false, length = 50, unique = true)
    private String email;

    @Column(name = "contrasena", nullable = false, length = 20)
    private String password;

    @Column(name = "fecha_nacimiento", nullable = false, columnDefinition = "DATE")
    private LocalDate birthDate;

    @Column(name = "telefono", nullable = false, length = 50)
    private String phoneNumber;

    @OneToMany(mappedBy = "customer")
    private List<InternalAccount> internalAccounts;

    @OneToMany(mappedBy = "customer")
    private List<Transaction> transactions;
    
}
