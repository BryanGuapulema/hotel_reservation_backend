# 🏨 Hotel Reservation API

API RESTful para la gestión de un sistema de reservas de hotel.  
Soporta autenticación con JWT en cookies httpOnly, protección de rutas y control de roles (`user` y `admin`).  

---

## 🚀 Endpoints principales

### Autenticación (`/auth`)
| Método | Ruta        | Descripción                          | Acceso |
|--------|-------------|--------------------------------------|--------|
| POST   | `/register` | Registrar un nuevo usuario           | Público |
| POST   | `/login`    | Iniciar sesión, genera JWT en cookie | Público |
| POST   | `/logout`   | Cerrar sesión (elimina cookie)       | Usuario autenticado |
| GET    | `/me`       | Devuelve datos del usuario logueado  | Usuario autenticado |

---

### Usuarios (`/users`)
| Método | Ruta       | Descripción                  | Acceso |
|--------|------------|------------------------------|--------|
| GET    | `/`        | Listar todos los usuarios    | Admin |
| GET    | `/:id`     | Obtener un usuario por ID    | Admin |
| POST   | `/`        | Crear un nuevo usuario       | Público |
| PUT    | `/:id`     | Actualizar usuario por ID    | Admin |
| DELETE | `/:id`     | Eliminar usuario por ID      | Admin |

---

### Habitaciones (`/rooms`)
| Método | Ruta      | Descripción                         | Acceso |
|--------|-----------|-------------------------------------|--------|
| GET    | `/`       | Listar todas las habitaciones       | Usuario autenticado |
| GET    | `/:id`    | Ver detalles de una habitación      | Usuario autenticado |
| POST   | `/`       | Crear una nueva habitación          | Admin |
| PUT    | `/:id`    | Actualizar una habitación           | Admin |
| DELETE | `/:id`    | Eliminar una habitación             | Admin |

---

### Reservas (`/reservations`)
| Método | Ruta      | Descripción                         | Acceso |
|--------|-----------|-------------------------------------|--------|
| GET    | `/`       | Listar todas las reservas           | Admin |
| GET    | `/:id`    | Obtener una reserva por ID          | Usuario autenticado |
| POST   | `/`       | Crear una nueva reserva             | Usuario autenticado |
| PUT    | `/:id`    | Actualizar una reserva por ID       | Usuario autenticado |
| DELETE | `/:id`    | Eliminar una reserva por ID         | Usuario autenticado |

---

## 🔒 Seguridad
- **Autenticación**: JWT almacenado en cookie httpOnly.  
- **Autorización**: Middleware que restringe rutas según `role` (`user`, `admin`).  
- **Protección global**: Todas las rutas (excepto `/auth/register` y `/auth/login`) requieren estar logueado.  

---

## 📌 Roles
- **Usuario (`user`)**  
  - Puede ver habitaciones.  
  - Puede crear, ver, actualizar y eliminar sus reservas.  

- **Administrador (`admin`)**  
  - Todo lo anterior.  
  - Puede gestionar usuarios, habitaciones y todas las reservas del sistema.  
