# 🚗 MyCars - Gestión de Concesionario

## 📋 Descripción
MyCars es una aplicación web moderna para la gestión integral de un concesionario de vehículos. Permite administrar el inventario de coches, gestionar ventas y proporcionar una experiencia de usuario premium tanto para administradores como para clientes.

## ✨ Características Principales

- 🎯 **Gestión de Inventario**
  - Catálogo completo de vehículos
  - Gestión de fotos múltiples por vehículo
  - Sistema de filtrado y búsqueda avanzada

- 💼 **Gestión de Marcas y Modelos**
  - Administración de marcas de vehículos
  - Catálogo de modelos por marca
  - Información detallada de cada modelo

- 🛠 **Características Técnicas**
  - Arquitectura hexagonal
  - API RESTful
  - Gestión de imágenes optimizada
  - Diseño responsive

## 🚀 Tecnologías Utilizadas

### Frontend
- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Axios para peticiones HTTP

### Backend
- Spring Boot 3
- Java 17
- PostgreSQL
- Spring Data JPA
- Spring Security

## 🛠 Requisitos Previos

- Node.js (v18 o superior)
- Java JDK 17
- PostgreSQL 15
- Maven

## ⚙ Configuración del Proyecto

### Backend

1. Crear base de datos PostgreSQL:
```sql
CREATE DATABASE myCars;
```

2. Configurar application.properties:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/myCars
spring.datasource.username=tu_usuario
spring.datasource.password=tu_contraseña
```

3. Ejecutar el backend:
```bash
cd backend
mvn spring-boot:run
```

### Frontend

1. Instalar dependencias:
```bash
cd frontend
npm install
```

2. Configurar variables de entorno:
```bash
cp .env.example .env.local
```

3. Ejecutar el frontend:
```bash
npm run dev
```

## 📁 Estructura del Proyecto

```
MyCars/
├── backend/                 # Servidor Spring Boot
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/      # Código fuente Java
│   │   │   └── resources/ # Recursos y configuración
│   │   └── test/          # Tests
│   └── pom.xml            # Dependencias Maven
│
├── frontend/               # Cliente Next.js
│   ├── src/
│   │   ├── app/          # Páginas y rutas
│   │   ├── components/   # Componentes React
│   │   ├── modules/      # Módulos de la aplicación
│   │   └── shared/       # Componentes compartidos
│   └── package.json      # Dependencias npm
│
└── README.md              # Este archivo
```

## 🔐 Seguridad (Coming soon)

- Autenticación basada en JWT
- Roles de usuario (Admin, Staff, Cliente)
- Validación de datos en frontend y backend
- Protección contra CSRF
- Sanitización de entradas

## 🌟 Características Futuras

- [ ] Sistema de reservas online
- [ ] Integración con pasarela de pagos
- [ ] App móvil con React Native
- [ ] Sistema de notificaciones
- [ ] Chat en tiempo real para atención al cliente

## 👥 Contribución

1. Fork del repositorio
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Contacto
- Email - p82garpr@uco.es
- Link del Proyecto: [https://github.com/p82garpr/myCars](https://github.com/p82garpr/myCars)
