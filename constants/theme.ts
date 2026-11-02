import { EstadoTicket, PrioridadTicket } from "./types";

// Tema centralizado de la app. Se comparte a todos los componentes
// mediante el ThemeProvider de styled-components (ver app/_layout.tsx).
export const tema = {
  colores: {
    primario: "#1B2A4A",
    primarioClaro: "#2E4374",
    acento: "#3B82F6",
    fondo: "#F5F7FA",
    superficie: "#FFFFFF",
    texto: "#1E293B",
    textoSecundario: "#52606D",
    textoTenue: "#7F8C8D",
    textoSobrePrimario: "#A9B4C9",
    borde: "#E2E8F0",
    blanco: "#FFFFFF",
    peligro: "#E74C3C",
    advertencia: "#F5A623",
    exito: "#27AE60",
  },
  radios: {
    chico: 8,
    medio: 14,
    grande: 24,
  },
};

export type Tema = typeof tema;

// Colores según el estado del ticket.
export const coloresEstado: Record<EstadoTicket, string> = {
  Abierto: tema.colores.peligro,
  "En proceso": tema.colores.advertencia,
  Resuelto: tema.colores.exito,
};

// Colores según la prioridad del ticket.
export const coloresPrioridad: Record<PrioridadTicket, string> = {
  Alta: tema.colores.peligro,
  Media: tema.colores.advertencia,
  Baja: tema.colores.textoTenue,
};

// Íconos (Ionicons) para cada estado.
export const iconosEstado: Record<EstadoTicket, "alert-circle" | "time" | "checkmark-circle"> = {
  Abierto: "alert-circle",
  "En proceso": "time",
  Resuelto: "checkmark-circle",
};
