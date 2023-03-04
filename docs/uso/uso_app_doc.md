# Como usar la aplicación:

A continuación se muestran las instrucciones de como usar la aplicación.

## Página de Login

- La aplicación inicia en la página de Login. Aquí se debe ingresar un correo y contraseña válidos para poder acceder a la aplicación. Aquí se muestran algunos de estos con los cuales se puede ingresar. 

    <div style="text-align:center;">
    <img
    src="img/ingreso_login.png"
    alt="Datos de ingreso para los campos de login"
    caption="Datos de ingreso para los campos de login"
    width="500" >
    </div>

    <br>
- Hay que tener en cuenta lo siguiente: 

   - Si se deja en blanco uno o los dos campos, aparece un mensaje de error.

        <div style="text-align:center;">
        <img
        src="img/datos_incompletos_login.png"
        alt="Mensaje de error por los datos incompletos en los campos de login"
        caption="Mensaje de error por los datos incompletos en los campos de login"
        width="500" >
        </div>

    <br>

    - Si se ingresan mal las credenciales en los campos, también aparece un mensaje de error. 

        <div style="text-align:center;">
        <img
        src="img/credenciales_invalidas_login.png"
        alt="Mensaje de error por las credenciales inválidas en los campos de login"
        caption="Mensaje de error por las credenciales inválidas en los campos de login"
        width="500" >
        </div>

    <br>

    - Si se ingresan correctamente las credenciales en los campos, aparece un mensaje de login exitoso. 

        <div style="text-align:center;">
        <img
        src="img/credenciales_validas_login.png"
        alt="Mensaje exitoso por credenciales válidas en los campos de login"
        caption="Mensaje exitoso por credenciales válidas en los campos de login"
        width="500" >
        </div>

<br>

---
## Página de Home
- Al acceder correctamente se tiene ingreso a la página de Home, la cual cuenta con lo siguiente:

    <div style="text-align:center;">
    <img
    src="img/funcionalidades_home.png"
    alt="Funcionalidades de la página de Home"
    caption="Funcionalidades de la página de Home"
    width="500" >
    </div>

<br>

---
## Barra de Navegación:
- Una vez que se tiene acceso a la aplicación aparecerá una barra de navegación en todas las páginas, desde la cual se podrá navegar a la página de Home, Depósito, Retiro o cerrar sesión. 
  
  - Desde la pestaña de *Inicio* se podrá navegar a la página principal y desde la pestaña de *Transacción* se podrá navegar a la *página de Depósito* y a la *página de Retiro*.
  
    <div style="text-align:center;">
    <img
    src="img/menu_navegacion.png"
    alt="Pestañas de la barra de navegación"
    caption="Pestañas de la barra de navegación"
    width="500" >
    </div>
    <br>

  - Desde la pestaña donde está el nombre del usuario se podrá cerrar sesión.   
  
    <div style="text-align:center;">
    <img
    src="img/cerrar_sesion.png"
    alt="Cerrar sesión desde la barra de navegación"
    caption="Cerrar sesión desde la barra de navegación"
    width="500" >
    </div>

---
## Página de Detalles de Cuenta
- Cuando se da clic en alguno de los botones de la tabla *Mis Cuentas* de la ***Página Home***, se puede acceder a la ***Página de Detalles de la Cuenta***, que es donde se muestra la información de una cuenta específica. Para este ejemplo se accede a la cuenta de la primera fila.

    <div style="text-align:center;">
    <img
    src="img/funcionalidades_detalles_cuenta.png"
    alt="Funcionalidades de la página de Detalles de Cuenta"
    caption="Funcionalidades de la página de Detalles de Cuenta"
    width="500" >
    </div>

---
## Página de Depósito
- Al acceder a esta página desde el menú de navegación o desde el botón ***Depósito***  de la ***página de Home***, aparecerá de la siguiente manera:

    <div style="text-align:center;">
    <img
    src="img/funcionalidades_deposito.png"
    alt="Funcionalidades de la página de Depósito"
    caption="Funcionalidades de la página de Depósito"
    width="500" >
    </div>
<br>

- Para digilenciar el formulario se debe tener en cuenta:

    - Seleccionar una de las cuentas internas o cuentas de origen desde la cual se va a realizar el depósito.

        <div style="text-align:center;">
        <img
        src="img/cuenta_origen_deposito.png"
        alt="Seleccionar una cuenta en el campo No Cuenta Origen"
        caption="Seleccionar una cuenta en el campo No Cuenta Origen"
        width="500" >
        </div>

     <br>

    - Una vez seleccionada el No de Cuenta Origen, automáticamente aparecerá el saldo disponible asociado a esa cuenta.
  
        <div style="text-align:center;">
        <img
        src="img/saldo_disponible_deposito.png"
        alt="Saldo disponible de cuenta"
        caption="Saldo disponible de cuenta"
        width="500" >
        </div>

    <br>

    - En el campo de ***monto a depositar*** se deberá ingresar un valor superior o igual a 1000 pesos y que no sea superior al saldo disponible. En caso de utilizar decimales se utilizará el punto y solo se pueden usar dos cifras decimales. 
  
      - Este es el ejemplo de un monto que ha sido ingresado correctamente.
  
        <div style="text-align:center;">
        <img
        src="img/monto_correcto_deposito_ejemplo1.png"
        alt="Primer ejemplo de monto correcto para un depósito"
        caption="Primer ejemplo de monto correcto para un depósito"
        width="300" >
        </div>

      <br>

      - Este es el otro ejemplo de un monto con notación decimal, pero también ha sido ingresado correctamente.
  
        <div style="text-align:center;">
        <img
        src="img/monto_correcto_deposito_ejemplo2.png"
        alt="Segundo ejemplo de monto correcto para un depósito"
        caption="Segundo ejemplo de monto correcto para un depósito"
        width="300" >
        </div>
    
      <br>

      - Si se ingresa un monto menor a 1000 pesos saldrá un mensaje de error.
  
        <div style="text-align:center;">
        <img
        src="img/monto_incorrecto_deposito_ejemplo1.png"
        alt="Primer ejemplo de monto incorrecto para un depósito"
        caption="Primer ejemplo de monto incorrecto para un depósito"
        width="300" >
        </div>

      <br>

      - Si se ingresa un monto mayor al saldo disponible también saldrá el mensaje de error.
  
        <div style="text-align:center;">
        <img
        src="img/monto_incorrecto_deposito_ejemplo2.png"
        alt="Segundo ejemplo de monto incorrecto para un depósito"
        caption="Segundo ejemplo de monto incorrecto para un depósito"
        width="300" >
        </div>
    <br>

    - Dependiendo si la cuenta a la cual se le va a transferir el depósito es del mismo banco o no, se debe seleccionar alguna de las siguientes opciones:
  
      - Si es del mismo banco, se selecciona la casilla ***La cuenta destino pertenece al mismo banco?*** y automáticamente de deshabilita la selección de la cuenta destino.

        <div style="text-align:center;">
        <img
        src="img/mismo_banco.png"
        alt="Selección del mismo banco para el depósito"
        caption="Selección del mismo banco para el depósito"
        width="300" >
        </div>

      <br>

      - Si NO es del mismo banco, se quita la selección de la casilla ***La cuenta destino pertenece al mismo banco?*** y se deberá seleccionar dentro de las opciones el banco al cual está asociada la cuenta destino.

        <div style="text-align:center;">
        <img
        src="img/distinto_banco.png"
        alt="Selección de otro banco para el depósito"
        caption="Selección de otro banco para el depósito"
        width="300" >
        </div>

      <br>

    - Seleccionar el tipo de cuenta de destino, si es de ahorros o corriente.

        <div style="text-align:center;">
        <img
        src="img/tipo_cuenta_destino.png"
        alt="Selección del tipo de cuenta de destino para el depósito"
        caption="Selección del tipo de cuenta de destino para el depósito"
        width="300" >
        </div>

    <br>

    - Para el campo ***No Cuenta a depositar*** también se tiene que tener en cuenta si está cuenta es del mismo banco o pertenece a otro banco, para así seleccionar alguna de las siguientes opciones:
    
      - Si es del mismo banco, al seleccionar el check de ***La cuenta destino pertenece al mismo banco?*** y al seleccionar el tipo de cuenta (Ahorros o Corriente), automáticamente aparecerá el código del mismo banco para ese tipo de cuenta. Luego se deberá digitar los 7 últimos números de la cuenta interna a la cual se va a realizar el depósito. Hay que aclarar que no se puede realizar un depósito a la misma cuenta de origen y tiene que ser una cuenta existente. 

        <div style="text-align:center;">
        <img
        src="img/cuenta_interna_destino.png"
        alt="Codigo y número de cuenta destino del mismo banco"
        caption="Codigo y número de cuenta destino del mismo banco"
        width="400" >
        </div>
    
       <br>

      - Si es de distinto banco, al seleccionar el banco de la cuenta destino y el tipo de cuenta (Ahorros o Corriente), automáticamente aparecerá el código del correspondiente banco asociado a ese tipo de cuenta. Luego, igual que el caso anterior, se deberá digitar los 7 últimos números de la cuenta externa a la cual se va a realizar el depósito. 

        <div style="text-align:center;">
        <img
        src="img/cuenta_externa_destino.png"
        alt="Codigo y número de cuenta destino de distinto banco"
        caption="Codigo y número de cuenta destino de distinto banco"
        width="400" >
        </div>

       <br>

      - Tanto para que la cuenta destino sea interna o externa, si no se digitan los siete últimos números de la cuenta, aparecerá un mensaje de error. 

        <div style="text-align:center;">
        <img
        src="img/error_cuenta_destino.png"
        alt="Número de cuenta destino incompleta"
        caption="Número de cuenta destino incompleta"
        width="300" >
        </div>

    <br>

    - Un ejemplo de formulario de depósito diligenciado correctamente quedaría de la siguiente manera:
  
      - Para realizar un depósito a una cuenta existente del mismo banco:

        <div style="text-align:center;">
        <img
        src="img/deposito_mismo_banco.png"
        alt="Formulario de depósito a una cuenta del mismo banco diligenciado correctamente"
        caption="Formulario de depósito a una cuenta del mismo banco diligenciado correctamente"
        width="400" >
        </div>

        <br>

      - Para realizar un depósito a una cuenta de otro banco:

        <div style="text-align:center;">
        <img
        src="img/deposito_mismo_banco.png"
        alt="Formulario de depósito a una cuenta de otro banco diligenciado correctamente"
        caption="Formulario de depósito a una cuenta de otro banco diligenciado correctamente"
        width="400" >
        </div>
<br>

- Luego de darle continuar al formulario de depósito aparecerá una ventana para poder confirmar o cancelar el envío del depósito. 

    <div style="text-align:center;">
    <img
    src="img/confirmar_deposito.png"
    alt="Ventana de confirmación del depósito"
    caption="Ventana de confirmación del depósito"
    width="400" >
    </div>

- Si ocurre un error en el envío del depósito tal vez debido al número de cuenta de destino o algún otro error del servidor, aparecerá la siguiente ventana de error:

    <div style="text-align:center;">
    <img
    src="img/deposito_error.png"
    alt="Ventana de error en el envío del depósito"
    caption="Ventana de error en el envío del depósito"
    width="400" >
    </div>

- Pero si todo sale satisfactoriamente en el envío del depósito, aparecerá la siguiente ventana de éxito:

    <div style="text-align:center;">
    <img
    src="img/deposito_exitoso.png"
    alt="Ventana de depósito exitoso"
    caption="Ventana de depósito exitoso"
    width="400" >
    </div>
<br>

## Página de Retiro
- Al acceder a esta página desde el menú de navegación o desde el botón ***Retiro***  de la ***página de Home***, aparecerá de la siguiente manera:

    <div style="text-align:center;">
    <img
    src="img/funcionalidades_retiro.png"
    alt="Funcionalidades de la página de Retiro"
    caption="Funcionalidades de la página de Retiro"
    width="500" >
    </div>
<br>

- Para digilenciar el formulario se debe tener en cuenta:

    - Seleccionar una de las cuentas internas o cuentas de origen desde la cual se va a realizar el retiro. Una vez seleccionada, automáticamente aparecerá el saldo disponible asociado a esta cuenta
  
        <div style="text-align:center;">
        <img
        src="img/cuenta_origen_y_saldo_retiro.png"
        alt="Seleccion de cuenta origen y verificación de saldo disponible"
        caption="Seleccion de cuenta origen y verificación de saldo disponible"
        width="500" >
        </div>

    <br>

    - En el campo de ***monto a retirar*** se deberá ingresar un valor superior o igual a 20000 pesos y que no sea superior al saldo disponible. En caso de utilizar decimales se utilizará el punto y solo se pueden usar dos cifras decimales. 
  
      - Este es el ejemplo de un monto que ha sido ingresado correctamente.
  
        <div style="text-align:center;">
        <img
        src="img/monto_correcto_retiro_ejemplo1.png"
        alt="Primer ejemplo de monto correcto para un retiro"
        caption="Primer ejemplo de monto correcto para un retiro"
        width="300" >
        </div>

      <br>

      - Este es el otro ejemplo de un monto con notación decimal, pero también ha sido ingresado correctamente.
  
        <div style="text-align:center;">
        <img
        src="img/monto_correcto_retiro_ejemplo2.png"
        alt="Segundo ejemplo de monto correcto para un retiro"
        caption="Segundo ejemplo de monto correcto para un retiro"
        width="300" >
        </div>
    
      <br>

      - Si se ingresa un monto menor a 20000 pesos saldrá un mensaje de error.
  
        <div style="text-align:center;">
        <img
        src="img/monto_incorrecto_retiro_ejemplo1.png"
        alt="Primer ejemplo de monto incorrecto para un retiro"
        caption="Primer ejemplo de monto incorrecto para un retiro"
        width="300" >
        </div>

      <br>

      - Si se ingresa un monto mayor al saldo disponible también saldrá el mensaje de error.
  
        <div style="text-align:center;">
        <img
        src="img/monto_incorrecto_retiro_ejemplo2.png"
        alt="Segundo ejemplo de monto incorrecto para un retiro"
        caption="Segundo ejemplo de monto incorrecto para un retiro"
        width="300" >
        </div>

    <br>

    - Seleccionar el punto de retiro.

        <div style="text-align:center;">
        <img
        src="img/punto_retiro.png"
        alt="Selección del punto de retiro"
        caption="Selección del punto de retiro"
        width="300" >
        </div>

    <br>

    - Un ejemplo de formulario de retiro diligenciado correctamente quedaría de la siguiente manera:
  
    <div style="text-align:center;">
    <img
    src="img/retiro.png"
    alt="Formulario de retiro diligenciado correctamente"
    caption="Formulario de retiro diligenciado correctamente"
    width="400" >
    </div>

    <br>

- Luego de darle continuar al formulario de retiro aparecerá una ventana para poder confirmar o cancelar el envío del retiro. 

    <div style="text-align:center;">
    <img
    src="img/confirmar_retiro.png"
    alt="Ventana de confirmación del retiro"
    caption="Ventana de confirmación del retiro"
    width="400" >
    </div>

- Si ocurre un error en el envío del retiro tal vez debido al servidor, aparecerá la siguiente ventana de error:

    <div style="text-align:center;">
    <img
    src="img/retiro_error.png"
    alt="Ventana de error en el envío del retiro"
    caption="Ventana de error en el envío del retiro"
    width="400" >
    </div>

- Pero si todo sale satisfactoriamente en el envío del retiro, aparecerá la siguiente ventana de éxito:

    <div style="text-align:center;">
    <img
    src="img/retiro_exitoso.png"
    alt="Ventana de retiro exitoso"
    caption="Ventana de retiro exitoso"
    width="400" >
    </div>