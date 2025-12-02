# Especificación de Requisitos de Software (ERS)
## 📋 Documento ERS - Rocket Games

**Proyecto:** Rocket Games - Tienda Digital de Videojuegos  
**Versión:** 1.0  
**Fecha:** Enero 2025  
**Desarrolladores:** Kevin Salvatierra, Fernando Huamanchumo  
**Estado:** Completado ✅

---

## 📑 Tabla de Contenidos

1. [Introducción](#introducción)
2. [Descripción General del Proyecto](#descripción-general-del-proyecto)
3. [Requisitos Funcionales](#requisitos-funcionales)
4. [Requisitos No Funcionales](#requisitos-no-funcionales)
5. [Actores y Casos de Uso](#actores-y-casos-de-uso)
6. [Arquitectura del Sistema](#arquitectura-del-sistema)
7. [Especificaciones Técnicas](#especificaciones-técnicas)
8. [Seguridad](#seguridad)
9. [Restricciones y Limitaciones](#restricciones-y-limitaciones)
10. [Criterios de Aceptación](#criterios-de-aceptación)

---

## Introducción

### Propósito del Documento

Este documento especifica los requisitos funcionales y no funcionales para la aplicación **Rocket Games**, una plataforma de comercio electrónico especializada en la venta digital de videojuegos. El documento sirve como referencia para desarrolladores, testers y stakeholders.

### Alcance

Rocket Games es una aplicación web moderna que permite a usuarios finales:
- Explorar catálogo de videojuegos
- Agregar juegos al carrito de compras
- Realizar compras de forma segura
- Gestionar su perfil de usuario

Y a administradores:
- Gestionar inventario de juegos (CRUD)
- Gestionar usuarios del sistema (CRUD)
- Controlar acceso y permisos

---

## Descripción General del Proyecto

### Visión del Proyecto

Proporcionar una experiencia de compra intuitiva, segura y rápida para videojuegos digitales, con énfasis en los mejores precios del mercado chileno.

### Objetivos Principales

1. **Catálogo Dinámico:** Mantener un inventario actualizado de videojuegos
2. **Comercio Seguro:** Procesar transacciones de forma segura
3. **Gestión de Usuarios:** Sistema robusto de autenticación y autorización
4. **Panel Administrativo:** Herramientas completas para gestión de contenido
5. **Experiencia de Usuario:** Interfaz intuitiva y responsiva

### Público Objetivo

- **Usuarios Finales:** Gamers que buscan comprar videojuegos digitales
- **Administradores:** Personal encargado de gestionar la plataforma
- **Vendedores:** Usuarios con permisos de ROLE_SELLER

---

## Requisitos Funcionales

### RF-1: Autenticación de Usuarios

**Descripción:** El sistema debe permitir a los usuarios crear cuentas, iniciar sesión y cerrar sesión.

**Requisitos Específicos:**
- RF-1.1: Registro de nuevos usuarios con email y contraseña
- RF-1.2: Validación de email único (no pueden existir dos usuarios con el mismo email)
- RF-1.3: Login con email y contraseña
- RF-1.4: Recuperación de contraseña (opcional)
- RF-1.5: Logout con invalidación de sesión
- RF-1.6: Mantenimiento de sesión con JWT en localStorage

**Criterio de Aceptación:**
- Un usuario no autenticado no puede acceder a su perfil
- Un usuario registrado puede iniciar sesión con credenciales correctas
- Las contraseñas se almacenan de forma segura (hasheadas)

---

### RF-2: Gestión de Catálogo de Juegos

**Descripción:** El sistema debe permitir visualizar, filtrar y buscar videojuegos disponibles.

**Requisitos Específicos:**
- RF-2.1: Listar todos los juegos disponibles con precio y stock
- RF-2.2: Mostrar detalles de cada juego (título, descripción, precio, plataformas, categoría)
- RF-2.3: Filtrar juegos por categoría (Acción, RPG, Estrategia, etc.)
- RF-2.4: Búsqueda de juegos por título
- RF-2.5: Mostrar disponibilidad de stock en tiempo real
- RF-2.6: Mostrar imagen del juego (portada)

**Criterio de Aceptación:**
- Los juegos se cargan desde la API REST en /api/games
- Cada tarjeta de juego muestra: imagen, título, precio y botón "Agregar al carrito"
- Los juegos sin stock muestran estado "Agotado"

---

### RF-3: Carrito de Compras

**Descripción:** El sistema debe permitir a usuarios gestionar un carrito de compras persistente.

**Requisitos Específicos:**
- RF-3.1: Agregar juegos al carrito
- RF-3.2: Visualizar contenido del carrito
- RF-3.3: Aumentar/disminuir cantidad de items
- RF-3.4: Eliminar items del carrito
- RF-3.5: Vaciar carrito completamente
- RF-3.6: Calcular subtotal, IVA (19%) y total
- RF-3.7: Persistencia del carrito en localStorage
- RF-3.8: Sincronización del carrito entre pestañas del navegador

**Criterio de Aceptación:**
- El carrito persiste después de recargar la página
- El contador del carrito en el navbar se actualiza en tiempo real
- El cálculo de IVA es correcto (19% sobre subtotal)
- Los cambios en una pestaña se reflejan en otra

---

### RF-4: Proceso de Compra

**Descripción:** El sistema debe permitir a usuarios completar el proceso de compra.

**Requisitos Específicos:**
- RF-4.1: Mostrar resumen de compra
- RF-4.2: Validar disponibilidad de stock antes de comprar
- RF-4.3: Modal de confirmación de compra
- RF-4.4: Procesar pago (integración futura)
- RF-4.5: Generar orden de compra
- RF-4.6: Enviar confirmación por email (opcional)
- RF-4.7: Limpiar carrito después de compra exitosa

**Criterio de Aceptación:**
- No se puede comprar si no hay stock disponible
- La confirmación de compra muestra detalles del pedido
- El carrito se vacía después de completar la compra

---

### RF-5: Gestión del Perfil de Usuario

**Descripción:** Los usuarios autenticados pueden ver y editar su perfil.

**Requisitos Específicos:**
- RF-5.1: Visualizar información del usuario (nombre, email, rol)
- RF-5.2: Ver historial de compras
- RF-5.3: Editar información del perfil
- RF-5.4: Cambiar contraseña
- RF-5.5: Cerrar sesión desde el perfil

**Criterio de Aceptación:**
- Solo usuarios autenticados pueden acceder a /profile
- Los cambios en el perfil se guardan correctamente
- El historial muestra todas las compras del usuario

---

### RF-6: Panel de Administración - Gestión de Juegos (CRUD)

**Descripción:** Los administradores pueden crear, leer, actualizar y eliminar juegos del catálogo.

**Requisitos Específicos:**
- RF-6.1: Agregar nuevo juego con formulario
- RF-6.2: Campos del juego: título, descripción, precio, stock, imagen, categoría, plataformas
- RF-6.3: Editar juego existente
- RF-6.4: Eliminar juego con confirmación
- RF-6.5: Listar todos los juegos en tabla
- RF-6.6: Validar que precio y stock sean números positivos
- RF-6.7: Mostrar mensajes de éxito/error al manipular juegos

**Criterio de Aceptación:**
- Los cambios se reflejan inmediatamente en el catálogo
- Un juego eliminado no aparece en la tienda
- No se puede agregar un juego con precio negativo
- Solo usuarios ROLE_ADMIN pueden acceder a /admin

---

### RF-7: Panel de Administración - Gestión de Usuarios (CRUD)

**Descripción:** Los administradores pueden crear, leer, actualizar y eliminar usuarios del sistema.

**Requisitos Específicos:**
- RF-7.1: Crear nuevo usuario con email, nombre de usuario, contraseña y rol
- RF-7.2: Asignar rol (ROLE_USER o ROLE_ADMIN)
- RF-7.3: Editar usuario existente
- RF-7.4: Eliminar usuario con confirmación
- RF-7.5: Listar todos los usuarios en tabla
- RF-7.6: Ver estado del usuario (activo/inactivo)
- RF-7.7: Mostrar mensajes de éxito/error al manipular usuarios

**Criterio de Aceptación:**
- El email debe ser único en todo el sistema
- Un usuario ROLE_ADMIN tiene acceso a /admin/users
- Un usuario eliminado no puede iniciar sesión
- Los cambios de rol son efectivos inmediatamente

---

### RF-8: Control de Acceso y Autorización

**Descripción:** El sistema debe implementar control de acceso basado en roles (RBAC).

**Requisitos Específicos:**
- RF-8.1: ROLE_USER: Acceso a catálogo, carrito y perfil
- RF-8.2: ROLE_ADMIN: Acceso completo incluyendo paneles administrativos
- RF-8.3: Ruta protegida para /admin y /admin/users
- RF-8.4: Redireccionamiento a /forbidden si no tiene permisos
- RF-8.5: Mostrar/ocultar opciones de admin en navbar según rol

**Criterio de Aceptación:**
- Un usuario normal no puede acceder a /admin
- Un admin ve la opción "Administrador" en el navbar
- Intentar acceder a /admin sin permisos muestra página 403

---

### RF-9: Navegación y Interfaz

**Descripción:** La aplicación debe proporcionar una navegación clara e intuitiva.

**Requisitos Específicos:**
- RF-9.1: Navbar con logo, enlaces de navegación y carrito
- RF-9.2: Footer con información de contacto y enlaces
- RF-9.3: Página de inicio (Home) con hero section y catálogo
- RF-9.4: Página de error 404 para rutas inválidas
- RF-9.5: Página de error 403 para acceso denegado
- RF-9.6: Links dinámicos en navbar (Login/Profile según estado)

**Criterio de Aceptación:**
- La navegación funciona en todas las páginas
- El navbar se actualiza dinámicamente según autenticación
- Las páginas de error son claras y muestran opciones de retorno

---

## Requisitos No Funcionales

### RNF-1: Rendimiento

- **Tiempo de Carga:** Las páginas deben cargar en menos de 2 segundos
- **API Response Time:** Las respuestas de API deben ser menores a 500ms
- **Optimización:** Implementar lazy loading para imágenes
- **Caching:** Usar localStorage para datos que no cambian frecuentemente

### RNF-2: Usabilidad

- **Interfaz Intuitiva:** Menús claros y opciones fáciles de encontrar
- **Responsividad:** La aplicación debe funcionar en dispositivos móviles, tablets y desktop
- **Accesibilidad:** Cumplir con WCAG 2.1 nivel AA (opcional)
- **Validación:** Mensajes de error claros y constructivos

### RNF-3: Seguridad

- **Autenticación:** Implementar JWT para sesiones
- **Encriptación:** HTTPS para todas las comunicaciones
- **Validación:** Validar entrada en cliente y servidor
- **Protección:** Prevenir XSS, SQL Injection y CSRF
- **Almacenamiento:** No guardar contraseñas en plaintext

### RNF-4: Confiabilidad

- **Disponibilidad:** 99.5% uptime
- **Backup:** Realizar backups regularmente
- **Recuperación:** Implementar manejo de errores robusto
- **Logging:** Registrar eventos importantes para debugging

### RNF-5: Escalabilidad

- **Arquitectura:** Diseño escalable para soportar crecimiento
- **Base de Datos:** Optimizar queries para volúmenes grandes
- **API:** Implementar rate limiting para proteger recursos

### RNF-6: Mantenibilidad

- **Código Limpio:** Seguir estándares de codificación
- **Documentación:** Código comentado y documentación actualizada
- **Testing:** Suite de pruebas unitarias e integración
- **Versionado:** Git con commits descriptivos

---

## Actores y Casos de Uso

### Actores del Sistema

1. **Usuario No Autenticado (Guest)**
   - Puede: Ver catálogo, ver detalles de juegos
   - No puede: Comprar, acceder a admin

2. **Usuario Autenticado (ROLE_USER)**
   - Puede: Todo lo anterior + comprar, ver perfil
   - No puede: Acceder a paneles admin

3. **Administrador (ROLE_ADMIN)**
   - Puede: Todo lo anterior + gestionar juegos y usuarios

### Casos de Uso Principales

#### UC-1: Registrarse
```
Actor Principal: Usuario No Autenticado
Precondiciones: Usuario accede a /register
Flujo:
  1. Usuario ingresa email, nombre de usuario y contraseña
  2. Valida que email sea único
  3. Crea cuenta con rol ROLE_USER
  4. Envía a login o inicia sesión automáticamente
Postcondiciones: Usuario queda registrado y puede iniciar sesión
```

#### UC-2: Comprar Videojuego
```
Actor Principal: Usuario Autenticado
Precondiciones: Usuario está logueado, hay juegos en carrito
Flujo:
  1. Usuario accede a /cart
  2. Revisa items y precios
  3. Modifica cantidades si necesario
  4. Hace click en "Proceder al Pago"
  5. Sistema valida disponibilidad de stock
  6. Muestra confirmación de compra
  7. Usuario confirma pago
  8. Sistema procesa transacción
  9. Carrito se vacía
Postcondiciones: Orden creada, usuario recibe confirmación
```

#### UC-3: Agregar Juego
```
Actor Principal: Administrador
Precondiciones: Admin está logueado, accede a /admin
Flujo:
  1. Admin hace click en "Agregar Juego"
  2. Abre modal con formulario
  3. Completa campos: título, descripción, precio, stock, etc.
  4. Hace submit
  5. Sistema valida datos
  6. Juego se agrega a base de datos
  7. Modal se cierra y se muestra mensaje de éxito
Postcondiciones: Nuevo juego aparece en catálogo
```

#### UC-4: Editar Usuario
```
Actor Principal: Administrador
Precondiciones: Admin está logueado, accede a /admin/users
Flujo:
  1. Admin selecciona usuario a editar
  2. Abre modal con datos del usuario
  3. Modifica campos necesarios
  4. Hace submit
  5. Sistema valida cambios
  6. Actualiza usuario en base de datos
  7. Modal se cierra y se muestra mensaje de éxito
Postcondiciones: Cambios se reflejan inmediatamente
```

---

## Arquitectura del Sistema

### Arquitectura General

```
┌─────────────────────────────────────────────────────┐
│                   Cliente (Frontend)                │
│  React 19 + TypeScript + Vite + Bootstrap 5         │
└────────────────────┬────────────────────────────────┘
                     │
          ┌──────────┴──────────┐
          │  HTTP Requests      │
          │  (REST API)         │
          │                     │
┌─────────▼──────────────────────────────┐
│        Backend (Spring Boot)           │
│  API REST                              │
│  - /api/games (CRUD)                   │
│  - /api/users (CRUD)                   │
│  - /api/auth (Login/Register)          │
│  - /api/orders (Compras)               │
└─────────┬───────────────────────────────┘
          │
    ┌─────▼──────┐
    │  Database  │
    │ PostgreSQL │
    └────────────┘
```

### Capas de la Aplicación (Frontend)

```
┌─────────────────────────────────┐
│      Presentation Layer         │
│  (Components, Pages, Layouts)   │
├─────────────────────────────────┤
│      Context API Layer          │
│  (CartContext, AuthContext)     │
├─────────────────────────────────┤
│      Service Layer              │
│  (API calls, utilities)         │
├─────────────────────────────────┤
│      Data Layer                 │
│  (localStorage, API)            │
└─────────────────────────────────┘
```

### Estructura de Componentes

```
src/
├── components/
│   ├── admin/
│   │   ├── Admin.tsx (Gestión de Juegos)
│   │   ├── UserPanel.tsx (Gestión de Usuarios)
│   │   └── AdminRoute.tsx (Protección de rutas)
│   ├── common/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── NotFound.tsx
│   │   └── Forbidden.tsx
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── CartContext.tsx
│   ├── games/
│   │   ├── GameCard.tsx
│   │   └── GamesList.tsx
│   ├── home/
│   │   ├── Home.tsx
│   │   ├── Hero.tsx
│   │   └── Cart.tsx
│   ├── user/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── Profile.tsx
│   └── layouts/
│       └── MainLayout.tsx
├── App.tsx (Rutas principales)
└── main.tsx (Punto de entrada)
```

---

## Especificaciones Técnicas

### Stack Tecnológico

#### Frontend
- **React:** v19.2.0 (Librería de UI)
- **TypeScript:** v5.9.3 (Tipado estático)
- **Vite:** v7.2.4 (Bundler y dev server)
- **React Router DOM:** v7.9.6 (Enrutamiento)
- **Bootstrap:** v5.3.8 (Framework CSS)
- **localStorage API:** Para persistencia de datos

#### Backend (Requerimientos)
- **Spring Boot:** Framework Java
- **REST API:** Endpoints JSON
- **Base de Datos:** PostgreSQL
- **JWT:** Para autenticación

### Endpoints de API Requeridos

#### Autenticación
```
POST /api/auth/register
  Body: { username, email, password }
  Response: { id, username, email, token }

POST /api/auth/login
  Body: { email, password }
  Response: { id, username, email, role, token }

POST /api/auth/logout
  Response: { success: true }
```

#### Juegos
```
GET /api/games
  Response: Game[]

GET /api/games/:id
  Response: Game

POST /api/games (Admin only)
  Body: { title, description, price, stock, imageUrl, category, platforms }
  Response: Game

PUT /api/games/:id (Admin only)
  Body: { title, description, price, stock, imageUrl, category, platforms }
  Response: Game

DELETE /api/games/:id (Admin only)
  Response: { success: true }
```

#### Usuarios
```
GET /api/users (Admin only)
  Response: User[]

POST /api/users (Admin only)
  Body: { username, email, password, role }
  Response: User

PUT /api/users/:id (Admin only)
  Body: { username, email, role }
  Response: User

DELETE /api/users/:id (Admin only)
  Response: { success: true }
```

#### Órdenes
```
POST /api/orders
  Body: { items: CartItem[], total }
  Response: { orderId, status, total }

GET /api/orders (Usuario ve sus órdenes)
  Response: Order[]
```

### Tipos de Datos

#### Game
```typescript
interface Game {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  category?: string;
  platforms?: string[];
  price: number;
  stock: number;
}
```

#### User
```typescript
interface User {
  id: number;
  username: string;
  email: string;
  role: "ROLE_USER" | "ROLE_ADMIN";
  createdAt?: Date;
}
```

#### CartItem
```typescript
interface CartItem {
  id: number;
  nombre: string;
  precio: number;
  imagen?: string;
  cantidad: number;
}
```

#### Order
```typescript
interface Order {
  id: number;
  userId: number;
  items: CartItem[];
  total: number;
  subtotal: number;
  iva: number;
  status: "pending" | "completed" | "cancelled";
  createdAt: Date;
}
```

---

## Seguridad

### Autenticación

1. **Registro:**
   - Email debe ser único y válido
   - Contraseña debe cumplir requisitos mínimos
   - Hash de contraseña en servidor (bcrypt o similar)

2. **Login:**
   - Validar credenciales contra base de datos
   - Generar JWT con información de usuario
   - Almacenar token en localStorage (cliente)

3. **Sesión:**
   - JWT incluido en headers (Authorization: Bearer token)
   - Expiración de tokens (recomendado 24 horas)
   - Refresh tokens para renovación automática

### Autorización

1. **RBAC (Role-Based Access Control):**
   - ROLE_USER: Acceso a catálogo y compra
   - ROLE_ADMIN: Acceso completo

2. **Protección de Rutas:**
   - AdminRoute wrapper para rutas admin
   - Validar rol en backend en cada request

### Validación de Datos

1. **Cliente:**
   - Validación de formularios (email, contraseña)
   - Validación de tipos
   - Sanitización de entradas

2. **Servidor:**
   - Validar todos los datos recibidos
   - Rechazar requests malformados
   - Logging de intentos sospechosos

### Prevención de Ataques

- **XSS:** Usar React (escapa HTML automáticamente)
- **CSRF:** Implementar CSRF tokens en servidor
- **SQL Injection:** Usar queries parametrizadas (ORM)
- **Rate Limiting:** Limitar requests por IP/usuario

---

## Restricciones y Limitaciones

### Restricciones Técnicas

1. **Navegadores:** Chrome, Firefox, Safari, Edge (versiones recientes)
2. **Conectividad:** Requiere conexión a Internet
3. **Almacenamiento:** localStorage limitado (~5MB)
4. **Base de Datos:** PostgreSQL (requerido)

### Restricciones de Negocio

1. **Compras:** Solo usuarios autenticados pueden comprar
2. **Edición:** Solo admin puede editar juegos y usuarios
3. **Stock:** No se puede vender más unidades que las disponibles
4. **Precios:** No se aceptan precios negativos

### Limitaciones Conocidas

1. **Integración de Pago:** No implementada (placeholder)
2. **Email:** Confirmación por email no implementada
3. **Búsqueda:** Búsqueda básica (sin filtros avanzados)
4. **Historial:** No hay análisis detallado de ventas

---

## Criterios de Aceptación

### Criterios Generales de Aceptación

1. **Funcionalidad**
   - ✅ Todos los requisitos funcionales implementados
   - ✅ CRUD completo para juegos y usuarios
   - ✅ Carrito con persistencia en localStorage
   - ✅ Control de acceso basado en roles

2. **Calidad**
   - ✅ Código TypeScript sin errores de compilación
   - ✅ Componentes reutilizables y bien organizados
   - ✅ Manejo de errores consistente
   - ✅ Mensajes de usuario claros

3. **Performance**
   - ✅ Carga inicial < 2 segundos
   - ✅ Respuestas de API < 500ms
   - ✅ Transiciones suaves sin lag

4. **Seguridad**
   - ✅ JWT en headers HTTP
   - ✅ Validación en cliente y servidor
   - ✅ Protección de rutas admin
   - ✅ Contraseñas hasheadas

5. **Usabilidad**
   - ✅ Interfaz intuitiva
   - ✅ Mensajes de feedback claros
   - ✅ Responsive en mobile, tablet, desktop
   - ✅ Navegación consistente

### Criterios por Feature

#### Cart Feature
- ✅ Se agregan items correctamente
- ✅ Persiste al recargar página
- ✅ Sincroniza entre pestañas
- ✅ Calcula total con IVA correcto

#### Admin Features
- ✅ Crear/Editar/Eliminar juegos
- ✅ Crear/Editar/Eliminar usuarios
- ✅ Mensajes de éxito/error
- ✅ Confirmación en eliminaciones

#### Auth Features
- ✅ Registro con validación
- ✅ Login exitoso
- ✅ Protección de rutas
- ✅ Logout limpia sesión

---

## Aprobación del Documento

| Rol | Nombre | Firma | Fecha |
|-----|--------|-------|-------|
| Desarrollador Principal | Kevin Salvatierra | _________________ | ____/____/____ |
| Desarrollador Secundario | Fernando Huamanchumo | _________________ | ____/____/____ |
| Project Manager | _________________ | _________________ | ____/____/____ |
| Cliente/Sponsor | _________________ | _________________ | ____/____/____ |

---

**Fin del Documento ERS**

*Este documento está sujeto a cambios. Cualquier modificación debe ser autorizada por el equipo de desarrollo y registrada en el control de versiones.*
