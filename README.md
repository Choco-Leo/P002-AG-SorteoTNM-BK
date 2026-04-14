# SorteoTNM

## Sistema de Gestión de Grupos Deportivos (SorteoTNM)

El proyecto SorteoTNM es una aplicación web desarrollada para facilitar la organización de eventos deportivos del Tecnológico Nacional de México. Permite registrar, editar y visualizar grupos de diferentes instituciones tecnológicas participantes en diversas disciplinas deportivas.

## Características

- Visualización de grupos : Interfaz pública para consultar los grupos formados por deporte
- Filtrado de información : Búsqueda por institución, deporte y grupo
- Gestión de grupos : Registro, edición y eliminación de grupos (requiere autenticación)
- Autenticación de usuarios : Sistema de login para administradores
- Interfaz responsiva : Diseño adaptable a diferentes dispositivos

## Tecnologías

### Backend (BackNode)
- Runtime : Node.js
- Framework : Express.js
- Base de datos : PostgreSQL
- Autenticación : JWT (JSON Web Tokens)

## Variables de Entorno

PORT = Puerto en el que se ejecuta el servidor
NODE_ENV = Entorno de ejecución (development/production)
CORS_ORIGIN = Origen de acceso permitido

DB_HOST = Host de la base de datos
DB_USER = Usuario de la base de datos
DB_PASSWORD = Contraseña de la base de datos
DB_NAME = Nombre de la base de datos
DB_PORT = Puerto de la base de datos

JWT_SECRET = Clave secreta para firmar tokens JWT
SALT = Factor de costo para bcrypt

## Endpoints API

### Públicos
- POST / - Obtener grupos (con filtros opcionales)
- POST /loginST - Iniciar sesión
  
### Protegidos (requieren autenticación)
- POST /logoutST - Cerrar sesión
- POST /registerGrupoST - Registrar nuevo grupo
- PUT /edit-GruposST - Actualizar grupo existente
- POST /edit-GruposST - Obtener grupo por parámetros
- DELETE /edit-GruposST/:id - Eliminar grupo
- POST /resultadosST - Obtener resultados filtrados
