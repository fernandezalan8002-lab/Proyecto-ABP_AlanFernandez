# Mesa de Ayuda — App Móvil

## Descripción

Aplicación móvil desarrollada con **React Native + Expo** para el seguimiento de
tickets de soporte técnico de una mesa de ayuda (inspirada en el trabajo diario
en soporte de sistemas de salud). Permite visualizar los tickets ingresados,
con su estado, prioridad y datos del solicitante.

El proyecto se desarrolla de forma **incremental** en el marco de la materia
Laboratorio II, siguiendo la metodología de Aprendizaje Basado en Proyectos (ABP).
Esta es la **primera versión** de la aplicación, no la versión final.

## Integrantes

- Alan Fernandez

## Tecnologías

- React Native
- Expo / Expo Router
- TypeScript
- Styled Components

## Cómo correr el proyecto

```bash
npm install
npx expo start
```

Luego elegí cómo abrirlo:
- Presioná `a` para abrir en el emulador Android
- Presioná `w` para abrir en el navegador
- Escaneá el código QR con la app **Expo Go** desde tu celular (misma red WiFi)

## Estructura del proyecto

```
app/
  _layout.tsx      → navegación raíz (Stack)
  index.tsx        → pantalla principal (listado de tickets)
components/
  TicketCard.tsx   → componente reutilizable para mostrar un ticket
constants/
  types.ts         → tipos compartidos (Ticket, Estado, Prioridad)
data/
  tickets.ts        → datos estáticos (mock) de tickets
```

## Contenidos aplicados en esta versión

- Componentes `View`, `Text`, `Image` y `ScrollView`
- Datos estáticos (mock)
- Componente reutilizable (`TicketCard`) que recibe toda su información
  mediante **props**
- Estilado con Styled Components

## Listado de Features previstas y estado actual

| # | Feature | Estado |
|---|---------|--------|
| 1 | Consultar el listado de tickets | ✅ Implementado (con datos estáticos) |
| 2 | Consultar el detalle de un ticket | ⏳ Pendiente |
| 3 | Buscar un ticket por número o título | ⏳ Pendiente |
| 4 | Filtrar tickets por estado o prioridad | ⏳ Pendiente |

> El listado de Features se irá actualizando a medida que avance la cursada
> y se incorporen los contenidos correspondientes (navegación entre pantallas,
> manejo de estado, formularios, consumo de APIs, etc.).

## Notas

Esta versión no es la versión final del producto. Las funcionalidades que
requieren contenidos aún no trabajados en clase (navegación a pantalla de
detalle, formularios, persistencia de datos, etc.) se incorporarán en las
próximas entregas.
