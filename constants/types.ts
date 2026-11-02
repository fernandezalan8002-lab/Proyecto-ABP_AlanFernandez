// Tipos compartidos de la aplicación.

export type EstadoTicket = "Abierto" | "En proceso" | "Resuelto";
export type PrioridadTicket = "Alta" | "Media" | "Baja";

export const ESTADOS: EstadoTicket[] = ["Abierto", "En proceso", "Resuelto"];
export const PRIORIDADES: PrioridadTicket[] = ["Alta", "Media", "Baja"];

// Técnico de soporte asignado a un ticket (viene de la API, ver services/).
export interface TecnicoAsignado {
  id: number;
  nombre: string;
}

export interface Ticket {
  id: string;
  numero: string;
  titulo: string;
  descripcion: string;
  solicitante: string;
  area: string;
  estado: EstadoTicket;
  prioridad: PrioridadTicket;
  fecha: string;
  avatar: string;
  tecnico: TecnicoAsignado | null;
}

// Datos que completa el usuario en el formulario de "Nuevo ticket".
// El resto (id, número, fecha, estado...) lo genera el store.
export type NuevoTicket = Pick<
  Ticket,
  "titulo" | "descripcion" | "solicitante" | "area" | "prioridad"
>;

// Técnico tal como lo usamos en la app luego de transformar la respuesta de la API.
export interface Tecnico {
  id: number;
  nombre: string;
  usuario: string;
  email: string;
  telefono: string;
  ciudad: string;
  avatar: string;
}
