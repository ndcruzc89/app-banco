package co.prueba.nelsoncruz.server.service.impl;

import org.springframework.stereotype.Service;

import co.prueba.nelsoncruz.server.dto.UserResponseDto;
import co.prueba.nelsoncruz.server.model.repository.CustomerRepository;
import co.prueba.nelsoncruz.server.service.UserService;
import java.util.Objects;
import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final CustomerRepository userRepository;

    @Override
    public UserResponseDto validateUser(String email, String password) {
        
        Objects.requireNonNull(email, "El email no debe ser nulo");
        Objects.requireNonNull(password, "La contraseña no debe ser nula");
        
        var user = userRepository.findByEmailAndPassword(email, password)
                .orElseThrow(() -> new IllegalArgumentException("Credenciales inválidas"));
    
        return UserResponseDto.builder()
                .id(user.getId())
                .name(user.getName())
                .lastName(user.getLastName())
                .build();
    }
    
    
}
