# La Cerveceria

## Descripción

**La Cerveceria** es una aplicación diseñada para mejorar la experiencia en restaurantes. Permite a los clientes hacer pedidos directamente desde la aplicación al llegar al restaurante, eliminando la necesidad de esperar a ser atendidos por un mozo. Además, los usuarios pueden modificar o eliminar sus pedidos fácilmente, ofreciendo una experiencia más rápida y eficiente.

## Características Principales

- Realizar pedidos directamente desde la aplicación.
- Modificar o eliminar pedidos en cualquier momento.
- Gestión de usuarios y productos a través de la API.

## Tecnologías Usadas

- **Node.js**: Para construir el servidor backend.
- **MongoDB**: Base de datos NoSQL utilizada para almacenar la información de usuarios, productos y pedidos.
- **Express**: Framework web utilizado para manejar las rutas y controladores.
- **Postman**: Utilizado para probar y documentar la API.
- **Dependencias**:
  - `bcryptjs`
  - `cors`
  - `env-var`
  - `express`
  - `http-status-codes`
  - `joi`
  - `jsonwebtoken`
  - `mongoose`
  - `morgan`

## Requisitos Previos

Antes de instalar y ejecutar el proyecto, asegúrate de tener instalado:

- **Node.js** (versión 14 o superior).
- **MongoDB**: Puede ser local o mediante MongoDB Atlas.
- **Visual Studio Code** u otro editor de texto para modificar el código.

## Instalación

Sigue estos pasos para clonar e instalar el proyecto en tu máquina local:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tobiaszarlenga/backend-elixir-98i-p3.git
2. Instala las dependencias:
   cd backend-elixir-98i-p3
   npm install

## Configuracion   
Para que el backend funcione correctamente, crea un archivo '.env' en la raíz del proyecto con las siguientes variables de entorno
- `PORT=3000`
- `MONGODB_URI=mongodb+srv://exilirandbite:iQkHWB1wQNP5mCRL@cluster0.r5zvmyw.mongodb.net/rolling-tb-p3?- - -    retryWrites=true&w=majority&appName=Cluster0`
- `SECRET_KEY=tobi25`

## Uso
Para iniciar el servidor en modo de desarrollo, usa el siguiente comando:
`npm run dev`

## Rutas disponibles
- **POST /usuarios**: Agregar un nuevo usuario.
- **PUT /usuarios/:id**: Modificar un usuario existente.
- **DELETE /usuarios/:id**: Eliminar un usuario.
- **GET /productos**: Obtener una lista de productos.
- **POST /productos**: Agregar un nuevo producto.
- **PUT /productos/:id**: Modificar un producto existente.
- **DELETE /productos/:id**: Eliminar un producto.

## Documentación API

La API está documentada y puede ser probada utilizando Postman.

## Pruebas

No se han implementado pruebas automatizadas en este proyecto.

## Despliegue

Actualmente, no hay un proceso de despliegue en producción configurado para este proyecto.

## Licencia

Este proyecto está bajo la Rolling Code License.
