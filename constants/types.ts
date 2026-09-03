// Tipos compartidos de la aplicación.
// A medida que se sumen features (detalle, creación de tickets, etc.)
// este archivo va a ir creciendo.

export type EstadoTicket = "Abierto" | "En proceso" | "Resuelto";
export type PrioridadTicket = "Alta" | "Media" | "Baja";

export interface Ticket {
  id: string;
  numero: string;
  titulo: string;
  solicitante: string;
  area: string;
  estado: EstadoTicket;
  prioridad: PrioridadTicket;
  fecha: string;
  avatar: string;
}
