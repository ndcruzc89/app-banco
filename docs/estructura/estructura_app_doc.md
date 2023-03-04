# Estructura de la Aplicación

## Frontend
Todo lo relacionado con el **frontend** está en la carpeta ***client***, que está distribuido de la siguiente manera:

- ***client\src\assets\images***: contiene el logo de la aplicación. 
  
- ***client\src\components***: aquí están todos las carpetas con los componentes reutilizables de la aplicación. Algunas carpetas de estas además del archivo js cuenta con su respectivo archivo de estilos css.
  
- ***client\src\pages***: en este apartado están todas las carpetas con los componentes de página. Cada carpeta de estas además del archivo js, también cuenta con su respectivo archivo de estilos css. Es de aclarar que dentro de cada componente de página se incluyen los componentes reutilizables para así construir la página como tal.
  
- ***client\src\routes***: aquí se encuentran definidas todas las rutas a las cuales se podrá navegar en la aplicación.
  
- ***client\src\test***: contiene todos los archivos de testing de pruebas que se realizaron.
  
- ***client\src\App.js***: es uno de los archivos principales de la aplicación. Representa el componente raíz de la aplicación que contiene toda la estructura de componentes. 
  
- ***client\src\index.js***: también es uno de los archivos principales. Aquí es donde se renderiza toda la aplicación, a través del componente App.js.
   
- ***client\public***: en este apartado se encuentra el archivo index.html.
  
- ***client\package.json***: contiene todas dependencias necesarias para que funcione el frontend de la aplicación.
  
---
## Backend
Todo lo relacionado con el **backend (API)** está en la carpeta ***server***, que está distribuido de la siguiente manera:

- ***server\src\main\java\co\prueba\nelsoncruz\server\controller***: contiene todos controladores de la API, que es donde se manejan todas las solicitudes a través de los endpoints. 
  
- ***server\src\main\java\co\prueba\nelsoncruz\server\dto***: aquí están los archivos DTO, que se encargan de encapsular los datos que se reciben o se van a enviar. 
  
- ***server\src\main\java\co\prueba\nelsoncruz\server\model***: este apartado tiene las siguientes subcarpetas:
  - ***entity***: contiene todos los archivos del modelo de datos con sus respectivas relaciones.
  - ***repository***: contiene todos los archivos que interactuan con las entidades, para realizar consultas a la base de datos a través de la librería de JPA. 
  
- ***server\src\main\java\co\prueba\nelsoncruz\server\service***: aquí están los archivos de interfaz de servicio que son solicitados por los controladores. Este apartado tiene la siguiente subcarpeta:
  - ***impl***: contiene todos los archivos que implementan las funciones de la interfaz de servicio. Desde aquí es donde se llama al repositorio de cada modelo.

- ***server\src\main\java\co\prueba\nelsoncruz\server\ServerApplication.java***: es el archivo principal donde se ejecuta la aplicación. Este tiene una configuración adicional de CORS, para poder recibir las solicitudes HTTP. 

- ***server\src\main\resources\application.properties***: este archivo contiene la configuración del puerto y también toda la configuración de conexión a la base de datos. 

- ***server\src\test\java\co\prueba\nelsoncruz\server\service***: en este apartado están los archivos a los que se realizaron testing de pruebas. 

- ***server\pom.xml***: este archivo contiene todas las dependencias necesarias para que funcione el backend de la aplicación. 
