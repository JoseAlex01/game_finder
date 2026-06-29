# GameFinder AI

Aplicacion web desarrollada con React, Vite y JavaScript para explorar videojuegos Free-to-Play usando la API publica de FreeToGame.

## Requisitos

- Node.js 18 o superior
- npm 9 o superior

## Instalacion

Instala las dependencias del proyecto:

```bash
npm install
```

## Ejecutar en desarrollo

Inicia el servidor de desarrollo de Vite:

```bash
npm run dev
```

Luego abre la URL que muestre la terminal, normalmente:

```txt
http://localhost:5173/
```

## Ejecutar pruebas

Ejecuta todos los tests una sola vez:

```bash
npm run test
```

Ejecuta los tests en modo watch:

```bash
npm run test:watch
```

## Stack principal

- React
- Vite
- JavaScript
- React Router
- Vitest
- React Testing Library
- @testing-library/jest-dom

## Testing

Las pruebas estan organizadas en `src/tests` y cubren componentes, utilidades, servicios y paginas principales.

Las llamadas a la API se prueban con mocks para evitar conexiones reales a Internet durante la ejecucion de tests.
