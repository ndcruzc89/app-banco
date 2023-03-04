package co.prueba.nelsoncruz.server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.prueba.nelsoncruz.server.dto.UserRequestDto;
import co.prueba.nelsoncruz.server.service.UserService;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("api/login")
public class LoginController {
    private final UserService userService;

    @PostMapping
    public ResponseEntity<?> login(@RequestBody UserRequestDto user) {
        try {
            var response = userService.validateUser(user.getEmail(), user.getPassword());
            return ResponseEntity.ok(response);
        } catch (RuntimeException ex) {
            System.err.println(ex.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ex.getMessage());
        }
    }
}
