##Sistema de gestion de empleados 
Este proyecto es el trabajo final de el curso de creacion de una API con Node.js
Autor: Angel Marino Balderas Landaverde 
##  Requisitos Previos
Para ejecutar este sistema necesitas tener instalado:

**Node.js** (Versión LTS recomendada).
**XAMPP** (Para el servidor de base de datos MySQL).
**Git** (Opcional, si clonas el repositorio).

### 1. Instalar Dependencias
Abre tu terminal en la carpeta del proyecto y ejecuta:
npm install

##2.Configuración de Base de Datos (XAMPP)
Abre el panel de control de XAMPP.
Inicia los módulos Apache y MySQL (desactuva los servicios si es necesario liberar el puerto de mysql).
Entra a phpMyAdmin
Crea una nueva base de datos llamada: express_workshop
Selecciona la base de datos y ve a la pestaña "Importar"
Selecciona el archivo SQL incluido en este repo y dale a "Continuar" para crear las tablas y datos de prueba.

##3. Ejecutar el Servidor
En package.json en la seccion de scripts coloca : "start": "node index.js"
En la consola pon el siguiente comando "npm start"

Si todo es correcto, verás en la consola:
Servidor corriendo en http://localhost:3000 Conexión a MySQL exitosa

##4. Uso del sistema
Abre tu navegador web e ingresa a:  http://localhost:3000
El sistema ya cuenta con validacion de seguridad, utiliza estas credenciales que estan en la bd (son de prueba)

ADMINISTRADOR      	Correo:admin@admin.com,	    Contrasena:12345
Acceso total al panel, crear, editar, eliminar y buscar empleados.
USUARIO	      Correo:noesadmin@noesadmin.com,	    Contrasena:12345	
Acceso denegado (Solo demo de seguridad).
