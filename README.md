# APP BANCO

## ¿Qué es App Banco?
Es una aplicación web bancaria totalmente responsive, llamada EsTUBANCO, en la cual el cliente podrá manejar sus cuentas y transacciones de una forma óptima, confiable y segura. El objetivo es que pueda tener al alcance el estado de cada una de sus cuentas, y también que pueda realizar depósitos a través de estas a otras cuentas ya sean internas o externas; y además, que pueda realizar retiros en puntos seguros y supervisados. 

La aplicación está dividida en las siguientes interfaces:
- Interfaz de Login: el usuario podrá iniciar sesión para ingresar a la aplicación. Al iniciar sesión correctamente ingresará a la interfaz de Home.
- Interfaz de Inicio: es la página principal donde el usuario podrá visualizar en una tabla el estado de todas sus cuentas, seleccionar la cuenta que desee revisar y también dispondrá de unos botones para dirigirse a las interfaces de depósito o retiro. 
- Interfaz de Detalle de la Cuenta: esta provee al usuario el número, tipo y saldo disponible en la cuenta seleccionada.
- Interfaz de Depósito: aquí el usuario podrá transferir dinero a otras cuentas del mismo banco o cuentas externas que tienen convenio con el banco, pero la único requisito es que deben ser depósitos mayores o iguales a 1000 pesos y que no excedan su saldo disponible.
- Interfaz de Retiro: aquí el usuario podrá gestionar el retiro de su dinero seleccionando los puntos de retiro que tienen convenio con el banco, pero el único requisito es que los retiros deben ser mayores o iguales a 20000 pesos y no deben exceder su saldo disponible.

---
## Requerimientos
### Frontend:
- Node.js (Recomendada: vs 16.18.0)
- Biblioteca de React (Recomendada: vs 18.2.0)
- Extensión de Google Chrome de React Developer Tools. 

### Backend:
- Java SE 17
- Spring Boot 3.0.2 / Maven.
- Dependencias para vscode:  
  - Spring Boot Extension Pack
  - Extension Pack for Java
  - Test Runner for Java

---
## Instalación
### Frontend:  
- Navegar por medio de la consola hasta la carpeta raíz del proyecto (***app-banco***) y luego ejecutar el comando ***cd/client***
- Desde la consola ejecutar el comando ***npm install*** para instalar las dependencias

### Backend: 
- No se necesita nada adicional a los requerimientos.

---
## Cómo ejecutar la aplicación:
### Frontend:  
- Desde la consola dirigirse a la ruta ***client*** del proyecto y ejecutar el comando ***npm start***.

### Backend:
- Abrir el proyecto en el IDE de preferencia. 
- Abrir el archivo ***ServerApplication.java***, que se encuentra en la ruta ***server\src\main\java\co\prueba\nelsoncruz\server\ServerApplication.java*** del proyecto y ejecutarlo. 

---
## Estructura de la aplicación
La estructura de carpetas y rutas de la aplicación puede consultar el apartado ***docs\estructura\estructura_app_doc.md***

---
## Desarrollo de la aplicación

### Frontend:
La documentación relacionada con el desarrollo del frontend se encuentra en la ruta ***docs\desarrollo\frontend_doc\frontend_doc.md***

### Backend (API):
La documentación relacionada con el desarrollo del backend se encuentra en la ruta ***docs\desarrollo\database_doc\database_doc.md***

### Base de datos
La documentación relacionada con el desarrollo de la base de datos se encuentra en la ruta ***docs\desarrollo\database_doc\database_doc.md***

---
## ¿Cómo usar la aplicación?
Para saber como usar la aplicación se puede consultar la siguiente ruta ***docs\uso\uso_app_doc.md***

---
## Testing de pruebas
La información de este apartado se encuentra en la ruta ***docs\testing\testing_doc.md***

---
## Autor 
Nelson Daniel Cruz Camelo

