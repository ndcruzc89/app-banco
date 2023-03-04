package co.prueba.nelsoncruz.server.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UserResponseDto {
    private Long id;
    private String name;
    private String lastName;
}
