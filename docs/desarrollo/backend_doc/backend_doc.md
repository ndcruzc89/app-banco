# Desarrollo Backend

El backend se desarrollo usando:
- Java SE 17
- Spring Boot 3.0.2 / Maven.

Entonces, se usaron las siguientes dependencias, que son necesarias para la ejecución del proyecto con Spring Boot:
- spring-boot-starter-web
- spring-boot-devtools
- lombok
- spring-boot-starter-test
- spring-boot-starter-data-jpa
- mysql-connector-j
<br>

El backend esta configurado en el puerto 8081.

Se construyeron los siguientes endpoints:
- El endpoint ***http://localhost:8081/api/login*** con el método POST, que se usa para validar los datos de login del usuario y así permitirle o no ingresar a la aplicación. Probando este endpoint con Postman se tienen los siguientes casos:

    - Enviando en el body del json datos válidos de login:
  
        ```json
        {
            "email": "nelsonc89@gmail.com",
            "password": "Nelson123"
        }
        ```
        Se tiene el siguiente resultado:

        ```json
        {
            "id": 1,
            "name": "Nelson",
            "lastName": "Cruz"
        }
        ```
    <br>

    - Enviando en el body del json datos inválidos de login:
  
        ```json
        {
            "email": "nelsonc89@gmail.com",
            "password": "123"
        }
        ```

        Se tiene el siguiente resultado:

        ```json
        Credenciales inválidas
        ```
<br>

- El endpoint ***http://localhost:8081/api/account/id*** con el método GET, que se usa para obtener todas las cuentas asociadas al usuario. Ese id se refiere al id que se le asigna al usuario (cliente). Probando este endpoint con Postman se tiene el siguiente caso:

    - Con el parámetro de id=1, la url quedaría de la siguiente manera ***http://localhost:8081/api/account/1** y el resultado sería el siguiente:
  
        ```json
        [
            {
                "id": 1,
                "accountType": "Ahorros",
                "accountNumber": "1015489425",
                "availableBalance": 500000.00
            },
            {
                "id": 2,
                "accountType": "Ahorros",
                "accountNumber": "1018354896",
                "availableBalance": 88600.00
            },
            {
                "id": 3,
                "accountType": "Corriente",
                "accountNumber": "2014389654",
                "availableBalance": 175450.00
            }
        ]
        ```
<br>

- El endpoint ***http://localhost:8081/api/transaction/deposit*** con el método POST, que se usa para que el ususario pueda realizar el depósito a otras cuentas. Probando este endpoint con Postman se tienen los siguientes casos:

     - Enviando en el body del json datos válidos para un depósito a una cuenta interna:
  
        ```json
        {
            "amount": 35250,
            "date": "2023-03-02T09:36:15",
            "sameBank": true,
            "userId": 1,
            "sourceAccount": "1015489425",
            "accountType": 2,
            "destinationAccount": "2014389654",
            "bankId": null
        }
        ```

        Se tiene el siguiente resultado:

        ```json
        Depósito exitoso
        ```
    <br>

    - Enviando en el body del json datos inválidos de monto (esto aplica si el monto es menor a 1000 pesos o mayor al saldo disponible):
  
        ```json
        {
            "amount": 999,
            "date": "2023-03-02T09:36:15",
            "sameBank": true,
            "userId": 1,
            "sourceAccount": "1015489425",
            "accountType": 2,
            "destinationAccount": "2014389654",
            "bankId": null
        }
        ```

        Se tiene el siguiente resultado:

        ```json
        El monto a depositar es incorrecto
        ```
    <br>

    - Enviando en el body del json datos inválidos de tipo de cuenta (un tipo de cuenta que no existe):
  
        ```json
        {
            "amount": 35250,
            "date": "2023-03-02T09:36:15",
            "sameBank": true,
            "userId": 1,
            "sourceAccount": "1015489425",
            "accountType": 9,
            "destinationAccount": "2014389654",
            "bankId": null
        }
        ```

        Se tiene el siguiente resultado:

        ```json
        No se encontró el tipo de cuenta asociada
        ```

    - Enviando en el body del json datos inválidos de cuenta destino (la misma cuenta que la de origen):
  
        ```json
        {
            "amount": 35250,
            "date": "2023-03-02T09:36:15",
            "sameBank": true,
            "userId": 1,
            "sourceAccount": "1015489425",
            "accountType": 1,
            "destinationAccount": "1015489425",
            "bankId": null
        }
        ```

        Se tiene el siguiente resultado:

        ```json
        El número de cuenta de destino no puede ser igual al número de cuenta de origen
        ```
    <br>

     - Enviando en el body del json datos válidos para un depósito a una cuenta externa:
  
        ```json
        {
            "amount": 35250,
            "date": "2023-03-02T09:38:15",
            "sameBank": false,
            "userId": 1,
            "sourceAccount": "1015489425",
            "accountType": 2,
            "destinationAccount": "2112568944",
            "bankId": 1
        }
        ```

        Se tiene el siguiente resultado:

        ```json
        Depósito exitoso
        ```
    <br>

    - Enviando en el body del json datos inválidos de banco (un id de banco que no existe):
  
        ```json
        {
            "amount": 35250,
            "date": "2023-03-02T09:38:15",
            "sameBank": false,
            "userId": 1,
            "sourceAccount": "1015489425",
            "accountType": 2,
            "destinationAccount": "2112568944",
            "bankId": 15
        }
        ```

        Se tiene el siguiente resultado:

        ```json
        No se encontró el banco a la cuenta asociada
        ```
<br>

- El endpoint ***http://localhost:8081/api/transaction/withdrawal*** con el método POST, que se usa para que el ususario pueda realizar un retiro seleccionado un punto específico. Probando este endpoint con Postman se tienen los siguientes casos:

     - Enviando en el body del json datos válidos para un retiro:
  
        ```json
        {
            "amount": 25550,
            "date": "2023-03-02T10:38:15",
            "userId": 1,
            "sourceAccount": "1015489425",
            "withdrawalPointId": 1
        }
        ```

        Se tiene el siguiente resultado:

        ```json
        Retiro exitoso
        ```
    <br>

    - Enviando en el body del json datos inválidos de monto (esto aplica si el monto es menor a 20000 pesos o mayor al saldo disponible):
  
        ```json
        {
            "amount": 19000,
            "date": "2023-03-02T10:38:15",
            "userId": 1,
            "sourceAccount": "1015489425",
            "withdrawalPointId": 1
        }
        ```

        Se tiene el siguiente resultado:

        ```json
        El monto a retirar es incorrecto
        ```
    <br>

    - Enviando en el body del json datos inválidos de punto de retiro (un id de punto de retiro que no existe):
  
        ```json
        {
            "amount": 25550,
            "date": "2023-03-02T10:38:15",
            "userId": 1,
            "sourceAccount": "1015489425",
            "withdrawalPointId": 15
        }
        ```

        Se tiene el siguiente resultado:

        ```json
        No se encontró el punto de retiro asociado
        ```