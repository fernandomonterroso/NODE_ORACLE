# nodewebpage

## Descripción
SERVICIO API PARA WEBPAGE 2.0 DE EMPRESA COMBEX-IM. Este proyecto es un servidor web backend construido con Node.js y Express, diseñado para gestionar peticiones API para la empresa Combex-IM.

## Versión
1.0.0

## Autor
FERNANDO MONTERROSO

## Licencia
ISC

## Instalación
Para instalar las dependencias del proyecto, ejecuta el siguiente comando en tu terminal:

```
npm install
Scripts Disponibles
En este proyecto, puedes ejecutar:

Producción

Copy code
npm run prod
Establece el entorno de producción y ejecuta la aplicación utilizando nodemon para el reinicio automático del servidor.

Desarrollo

Copy code
npm run dev
Establece el entorno de desarrollo y ejecuta la aplicación con reinicio automático para un rápido desarrollo y pruebas.

Linux

Copy code
npm run linux
Ejecuta la aplicación en sistemas Linux con las variables de entorno adecuadas.

Pruebas

Copy code
npm test
Ejecuta el comando para pruebas. (Actualmente no hay pruebas especificadas)

Dependencias
El proyecto utiliza las siguientes dependencias principales:

activedirectory2: Para la integración con Active Directory.
body-parser: Middleware de análisis de cuerpo para Node.js.
cors: Middleware para habilitar CORS (Compartición de Recursos de Origen Cruzado).
dotenv: Para cargar variables de entorno desde un archivo .env.
express: Framework de aplicaciones web para Node.js.
fs: Sistema de archivos, para trabajar con el sistema de archivos local.
jwt-simple: Para la creación y decodificación de JWTs (JSON Web Tokens).
moment: Librería para manipular y dar formato a fechas.
morgan: Middleware de registro de solicitudes HTTP para Node.js.
oracledb: Driver oficial de Oracle para Node.js.
simple-oracledb: Extensiones para el driver oracledb que facilitan su uso.
Configuración del Entorno
Antes de ejecutar la aplicación, asegúrate de configurar las variables de entorno necesarias en un archivo .env en la raíz del proyecto.

Ejecución
Para iniciar el servidor, ejecuta el siguiente comando:


Copy code
npm run dev # Para entorno de desarrollo
# o
npm run prod # Para entorno de producción
La aplicación se iniciará y estará escuchando en el puerto especificado en las variables de entorno o en el valor predeterminado.