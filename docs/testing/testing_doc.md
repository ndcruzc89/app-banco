# Testing de pruebas

## Frontend
Las pruebas unitarias para el frontend se realizaron usando las librerías de Testing Library y Jest, para lo cual son necesarias las siguientes dependencias npm:
- @testing-library/jest-dom vs 5.16.5
- @testing-library/react vs 14.0.0
- jest vs 27.5.1

En la ruta ***client\src\test*** hay una carpeta ***components***, la cual cuenta con todos los archivos de pruebas unitarias que se realizaron a algunos componentes de la aplicación. 

<br>

Para ejecutar las pruebas se pueden seguir los siguientes pasos:
1. Abrir el proyecto en el IDE de preferencia.
2. El IDE debe contar con alguna extensión para ejecutar pruebas con Jest (En VScode esta extensión se llama Jest).
3. Abrir en la pestaña de ***Testing*** e identificar la ruta anterior (***client\src\test\components***). Luego ejecutar las pruebas necesarias para cada verificar cada componente. 

---
## Backend
Las pruebas unitarias para el backend se realizaron usando Mockito en Springboot, para lo cual es necesaria la siguiente dependencia:

- spring-boot-starter-test

En la ruta ***server\src\test\java\co\prueba\nelsoncruz\server*** hay una carpeta ***service***, la cual cuenta con todos los archivos de pruebas unitarias que se realizaron a los servicios de la API de la aplicación.

Para ejecutar las pruebas se pueden seguir los siguientes pasos:
1. Abrir el proyecto en el IDE de preferencia.
2. El IDE debe contar con alguna extensión para ejecutar pruebas con java (En VScode esta extensión se llama Test Runner for Java).
3. Abrir en la pestaña de ***Testing*** e identificar la ruta anterior (***client\src\test\components***). Luego ejecutar las pruebas necesarias para cada verificar cada servicio. 