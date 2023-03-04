package co.prueba.nelsoncruz.server.service;

import co.prueba.nelsoncruz.server.dto.UserResponseDto;

public interface UserService {
    UserResponseDto validateUser(String email, String password);
}
