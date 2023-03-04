package co.prueba.nelsoncruz.server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.prueba.nelsoncruz.server.service.AccountService;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("api/account")
public class AccountController {

    private AccountService accountService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getAccounts(@PathVariable("id") Long customerId) {
        try {
            var response = accountService.getListAccounts(customerId);
            return ResponseEntity.ok().body(response);
        } catch (Exception ex) {
            System.err.println(ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ha ocurrido un error interno");
        }
    }
}
