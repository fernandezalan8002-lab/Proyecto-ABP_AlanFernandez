# Mesa de Ayuda — App Móvil

## Descripción

Aplicación móvil desarrollada con **React Native + Expo** para el seguimiento de
tickets de soporte técnico de una mesa de ayuda (inspirada en el trabajo diario
en soporte de sistemas de salud). Permite ver, buscar, filtrar, crear y gestionar
los tickets ingresados, cambiar su estado y asignarlos a un técnico del equipo
de soporte.

El proyecto se desarrolla de forma **incremental** en el marco de la materia
Laboratorio II, siguiendo la metodología de Aprendizaje Basado en Proyectos (ABP).

## Integrantes

- Alan Fernandez

## Tecnologías

- React Native + **Expo SDK 57**
- **Expo Router** (Stack, Tabs, rutas dinámicas y grupos)
- TypeScript
- **Styled Components** + `ThemeProvider` (tema centralizado)
- **Zustand** (estado global) + `persist` con **AsyncStorage**
- **TanStack Query** (consumo de API con caché)
- **Jest** + **React Native Testing Library** (tests)

## Cómo correr el proyecto

```bash
npm install
npx expo start
```

Luego elegí cómo abrirlo:
- Escaneá el código QR con la app **Expo Go** desde tu celular (misma red WiFi;
  si no conecta, probá `npx expo start --tunnel`)
- Presioná `a` para abrir en el emulador Android
- Presioná `w` para abrir en el navegador

Tests y chequeo de tipos:

```bash
npm test
npm run typecheck
```

## Estructura del proyecto

```
app/
  _layout.tsx          → Stack raíz + QueryClientProvider + ThemeProvider
  (tabs)/
    _layout.tsx        → navegación por pestañas (Tickets, Resumen, Equipo)
    index.tsx          → listado con búsqueda y filtros (FlatList)
    resumen.tsx        → contadores + tickets agrupados por estado (SectionList)
    equipo.tsx         → técnicos de soporte traídos de una API (TanStack Query)
  ticket/
    [id].tsx           → detalle del ticket (ruta dinámica)
  nuevo.tsx            → formulario de alta de ticket (modal)
components/            → componentes reutilizables (TicketCard, Badge, Chip,
                         FiltroChips, BarraBusqueda, Boton, Encabezado, EstadoVacio)
constants/
  types.ts             → tipos compartidos (Ticket, Estado, Prioridad, Tecnico)
  theme.ts             → tema de la app y colores por estado/prioridad
data/
  tickets.ts           → datos iniciales (mock)
store/
  useTicketsStore.ts   → store de Zustand con las acciones sobre los tickets
services/
  tecnicosService.ts   → petición HTTP (fetch) y transformación de los datos
hooks/
  useTecnicos.ts       → hook con useQuery reutilizado en dos pantallas
utils/
  tickets.ts           → funciones puras: filtrar, agrupar, contar, validar
__tests__/             → tests unitarios y de componentes
```

## Contenidos aplicados

| Unidad | Contenido | Dónde |
|--------|-----------|-------|
| I | `View`, `Text`, `Image`, `ScrollView`, `TextInput`, comunicación por props | todos los componentes |
| II | Styled Components + **ThemeProvider**, `TouchableOpacity`, íconos | `constants/theme.ts`, `components/` |
| III | Navegación **Stack** (push / back / replace), paso de parámetros | `app/_layout.tsx`, `router.push('/ticket/:id')` |
| III | **Rutas dinámicas** y **agrupadas** con Expo Router | `app/ticket/[id].tsx`, `app/(tabs)/` |
| III | Navegación por **Tabs** (con badge de tickets abiertos) | `app/(tabs)/_layout.tsx` |
| III | Pantalla **modal** | `app/nuevo.tsx` |
| IV | **FlatList** y **SectionList**, `ListEmptyComponent`, pull-to-refresh | `index.tsx`, `resumen.tsx`, `equipo.tsx` |
| IV | Filtrado por categorías y componentes reutilizables, SafeArea | `FiltroChips`, `utils/tickets.ts`, `Encabezado` |
| V | Peticiones HTTP con `fetch` y transformación de datos | `services/tecnicosService.ts` |
| V | **TanStack Query**: caché, estados de carga/error, reintento | `hooks/useTecnicos.ts` |
| V | Estado global con **Zustand**: store y acciones | `store/useTicketsStore.ts` |
| VI | Persistencia local con **AsyncStorage** y operaciones CRUD | `persist` en el store |
| — | Testing con **Jest** + **React Native Testing Library** | `__tests__/` |

## Listado de Features y estado actual

| # | Feature | Estado |
|---|---------|--------|
| 1 | Consultar el listado de tickets | ✅ Implementado |
| 2 | Consultar el detalle de un ticket | ✅ Implementado (ruta dinámica `/ticket/[id]`) |
| 3 | Buscar un ticket por número, título o solicitante | ✅ Implementado (sin distinguir mayúsculas ni tildes) |
| 4 | Filtrar tickets por estado o prioridad | ✅ Implementado (filtros combinables) |
| 5 | Crear un ticket nuevo con validación de campos | ✅ Implementado |
| 6 | Cambiar el estado de un ticket | ✅ Implementado |
| 7 | Asignar un técnico del equipo (datos desde API) | ✅ Implementado |
| 8 | Eliminar un ticket (con confirmación) | ✅ Implementado |
| 9 | Resumen de tickets por estado | ✅ Implementado |
| 10 | Guardar los cambios en el dispositivo | ✅ Implementado (AsyncStorage) |
| 11 | Adjuntar foto al ticket (cámara / galería) | ⏳ Pendiente |
| 12 | Editar los datos de un ticket | ⏳ Pendiente |

## Notas

- El equipo de soporte se obtiene de la API pública
  [JSONPlaceholder](https://jsonplaceholder.typicode.com/users); se necesita
  conexión a internet para verlo (si falla, la app muestra un mensaje con botón
  para reintentar).
- Los tickets se guardan en el dispositivo: desde la pestaña **Resumen** se
  pueden restablecer los datos de ejemplo.

## Historial de entregas

- **Unidad I**: pantalla principal, `TicketCard` reutilizable y datos estáticos.
- **Parcial 2**: navegación (Stack, Tabs, rutas dinámicas, modal), detalle,
  búsqueda y filtros, alta/edición de estado/baja de tickets con Zustand,
  consumo de API con TanStack Query, persistencia y tests.
