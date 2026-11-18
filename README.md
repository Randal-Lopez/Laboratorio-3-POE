# 🌎 ACORDATE – Mi diario de viajes

## 📖 Descripción del proyecto

**ACORDATE** es una aplicación web que permite registrar, organizar y conservar recuerdos de viajes en un diario digital personal. Los usuarios pueden guardar información de los destinos que han visitado, agregar fotografías, descripciones, fechas y calificaciones, creando una colección de experiencias que podrán consultar y revivir en cualquier momento.

La aplicación ofrece herramientas de búsqueda, filtrado y organización para facilitar la administración de los viajes, además de utilizar SQLite mediante SQL.js y localStorage para conservar la información en el navegador.

## 🎯 Objetivos del proyecto

### Objetivo general

Desarrollar una aplicación web que permita registrar, organizar y conservar experiencias de viaje mediante un diario digital, facilitando el almacenamiento de fotografías e información de los destinos visitados.

### Objetivos específicos

1. **Registrar y conservar recuerdos:** Permitir almacenar información, fotografías, fechas y calificaciones de los viajes realizados.

2. **Organizar y administrar viajes:** Facilitar la búsqueda, visualización, edición, eliminación y clasificación de los registros.

3. **Garantizar la persistencia de la información:** Implementar SQLite mediante SQL.js y localStorage para conservar los datos registrados en el navegador.

## ✨ Funcionalidades principales

- Registrar nuevos viajes.
- Subir fotografías desde el dispositivo.
- Visualizar recuerdos mediante tarjetas.
- Consultar los detalles de cada viaje.
- Editar y eliminar registros.
- Buscar viajes por nombre, país y ciudad.
- Filtrar viajes por categorías.
- Ordenar viajes por fecha.
- Conservar información mediante SQLite y localStorage.

## 🛠️ Tecnologías utilizadas

- HTML5
- CSS3
- TypeScript
- Vite
- SQL.js
- SQLite
- localStorage
- Git y GitHub
- Vercel

## 📦 Instalación

Clonar el repositorio:

```bash
git clone https://github.com/Randal-Lopez/Laboratorio-3-POE
```

Ingresar a la carpeta del proyecto:

```bash
cd ACORDATE
```

Instalar las dependencias:

```bash
npm install
```

## 🚀 Ejecutar en desarrollo

```bash
npm run dev
```

## 🏗️ Compilar el proyecto

```bash
npm run build
```

## 👀 Vista previa de producción

```bash
npm run preview
```

## 🗄️ Base de datos

ACORDATE utiliza **SQL.js** para ejecutar SQLite directamente en el navegador, sin necesidad de un servidor de base de datos externo.

La información de los viajes se almacena en una base de datos SQLite que posteriormente se serializa y guarda en `localStorage`, permitiendo conservar los registros al cerrar o actualizar la aplicación.

**Nota:** Los datos permanecen almacenados en el mismo navegador y dispositivo. No existe sincronización automática entre diferentes dispositivos.

## ☁️ Despliegue en Vercel

1. Subir el proyecto a un repositorio de GitHub.
2. Importar el repositorio desde Vercel.
3. Seleccionar Vite como framework.
4. Configurar `npm run build` como comando de compilación.
5. Establecer `dist` como directorio de salida.
6. Ejecutar el despliegue.

## 💡 Propósito de ACORDATE

ACORDATE busca convertir cada viaje en un recuerdo que perdure, ofreciendo un espacio digital donde los usuarios puedan guardar sus experiencias, organizar sus aventuras y recordar los lugares que han conocido.

**ACORDATE: los viajes terminan, los recuerdos permanecen.** 🌍✈️

## 👨‍💻 Autor

Proyecto desarrollado como una aplicación web para el registro, organización y conservación de experiencias de viaje.
