# 🏨 Sistema de Reservas de Hotel - Backend

## 📌 Descripción
El **Sistema de Reservas de Hotel** es una API RESTful desarrollada con **Node.js, Express y MongoDB**, cuyo propósito es gestionar de manera eficiente usuarios, habitaciones y reservas.  

El sistema incluye autenticación y autorización mediante **JWT**, manejo de sesiones con **cookies seguras**, y permite la administración de habitaciones y reservas por parte de usuarios con rol de administrador. Asimismo, los clientes pueden registrarse, autenticarse y gestionar sus propias reservas.  

Este proyecto está diseñado para ser un ejemplo práctico de construcción de un backend robusto, escalable y seguro.

---

## 🎯 Objetivos
- Implementar una API REST con **Node.js y Express**.
- Integrar una base de datos **MongoDB** utilizando **Mongoose**.
- Definir múltiples **recursos con relaciones** entre sí.
- Incorporar **autenticación y autorización** basada en roles.
- Manejar **cookies httpOnly** para la persistencia de sesiones.
- Aplicar **validaciones de entrada** y manejo de errores centralizado.
- Seguir buenas prácticas de arquitectura y seguridad en APIs.

---

## 🏗️ Recursos del Sistema

### 👤 Usuario (`User`)
- **Atributos**:
  - `name` (string, requerido)
  - `email` (string, único, requerido)
  - `password` (string, encriptado con bcrypt, requerido)
  - `role` (enum: `client` | `admin`, por defecto `client`)
  - `createdAt` (fecha de creación)
- **Relaciones**:
  - Un usuario puede tener múltiples **reservas**.

---

### 🏨 Habitación (`Room`)
- **Atributos**:
  - `number` (string o número único, requerido)
  - `type` (enum: `single`, `double`, `suite`, requerido)
  - `price` (número, requerido)
  - `status` (enum: `available`, `occupied`, `maintenance`, por defecto `available`)
- **Relaciones**:
  - Una habitación puede estar vinculada a múltiples **reservas** (en diferentes fechas).

---

### 📅 Reserva (`Reservation`)
- **Atributos**:
  - `userId` (referencia a `User`, requerido)
  - `roomId` (referencia a `Room`, requerido)
  - `checkIn` (fecha de entrada, requerida)
  - `checkOut` (fecha de salida, requerida)
  - `status` (enum: `active`, `cancelled`, `completed`, por defecto `active`)
  - `createdAt` (fecha de creación)
- **Restricciones**:
  - Una habitación no puede reservarse por dos clientes en las mismas fechas.
  - Al crear una reserva, la habitación cambia a estado `"occupied"`.

---

## 🔑 Autenticación y Seguridad
- Registro y login con contraseñas cifradas mediante **bcrypt**.
- **JWT** para autenticación, enviado en **cookies httpOnly**.
- Middleware de **autenticación** para rutas protegidas.
- Middleware de **autorización** para restringir acceso según roles.
- Validación de datos con librerías como **Joi** o **Zod**.
- Manejo centralizado de errores y respuestas JSON consistentes.

---

## 📌 Endpoints

### 🔐 Autenticación
- `POST /auth/register` → Registrar nuevo usuario.
- `POST /auth/login` → Iniciar sesión y recibir token.
- `GET /auth/me` → Obtener información del usuario autenticado.
- `POST /auth/logout` → Cerrar sesión.

---

### 👤 Usuarios
- `GET /users` (admin) → Listar todos los usuarios.
- `GET /users/:id` (admin o usuario autenticado) → Ver detalle de usuario.
- `DELETE /users/:id` (admin) → Eliminar usuario.

---

### 🏨 Habitaciones
- `GET /rooms` → Listar habitaciones (filtros: tipo, precio, disponibilidad).
- `GET /rooms/:id` → Detalle de una habitación.
- `POST /rooms` (admin) → Crear nueva habitación.
- `PUT /rooms/:id` (admin) → Actualizar información de habitación.
- `DELETE /rooms/:id` (admin) → Eliminar habitación.

---

### 📅 Reservas
- `POST /reservations` (cliente autenticado) → Crear una nueva reserva.
- `GET /reservations` → Listar reservas (admin: todas, cliente: solo las suyas).
- `GET /reservations/:id` → Detalle de una reserva específica.
- `PUT /reservations/:id/cancel` (cliente autenticado) → Cancelar reserva.
- `PUT /reservations/:id/complete` (admin) → Marcar reserva como completada.

---

## ⚙️ Requisitos Técnicos
- **Node.js** (v18 o superior)
- **Express.js** como framework principal.
- **MongoDB + Mongoose** para persistencia de datos.
- **bcrypt** para cifrado de contraseñas.
- **jsonwebtoken (JWT)** para autenticación.
- **dotenv** para manejo de variables de entorno.
- **cookie-parser** para trabajar con cookies.
- **Joi o Zod** para validación de datos.
- **CORS** configurado adecuadamente para permitir comunicación segura.

---

