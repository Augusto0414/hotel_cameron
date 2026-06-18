# Hotel Cameron - Frontend

Este es el frontend del proyecto Hotel Cameron, construido con React, TypeScript y Vite.

## Cómo ejecutar el proyecto

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local o de producción:

1. **Instalar las dependencias:**
   Abre una terminal en la raíz del proyecto y ejecuta el siguiente comando para instalar todos los paquetes necesarios:
   ```bash
   npm install
   ```

2. **Configurar las variables de entorno:**
   Para conectar el frontend con el backend, debes configurar la URL de la API.
   - Renombra el archivo `.env.template` a `.env` (básicamente, elimina la extensión `.template`).
   - Abre el nuevo archivo `.env` y busca la variable `VITE_API_URL`.
   - Reemplaza `http://127.0.0.1:8000` por la URL base de tu backend, **asegurándote de dejar la ruta `/api/` al final**.
   
   Por ejemplo, si tu backend está alojado en `https://mi-backend.render.com`, el archivo `.env` debería quedar así:
   ```env
   VITE_API_URL=https://mi-backend.render.com/api/
   ```

3. **Iniciar el servidor de desarrollo (Local):**
   Una vez configurado el archivo `.env`, puedes iniciar la aplicación en modo desarrollo ejecutando:
   ```bash
   npm run dev
   ```
   Esto abrirá la aplicación localmente (usualmente en `http://localhost:5173`).

4. **Construir y servir para producción:**
   Si deseas compilar el proyecto para producción y probarlo:
   ```bash
   npm run build
   npm start
   ```
