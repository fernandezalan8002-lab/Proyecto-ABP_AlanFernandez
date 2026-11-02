import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  EstadoTicket,
  NuevoTicket,
  TecnicoAsignado,
  Ticket,
} from "../constants/types";
import { ticketsIniciales } from "../data/tickets";
import { formatearFecha, siguienteNumero } from "../utils/tickets";

// Estado global de los tickets con Zustand.
// Cualquier pantalla (listado, detalle, resumen, equipo, formulario) lee y
// modifica los mismos datos sin tener que pasarlos por props o parámetros.
interface TicketsState {
  tickets: Ticket[];
  agregarTicket: (datos: NuevoTicket) => Ticket;
  cambiarEstado: (id: string, estado: EstadoTicket) => void;
  asignarTecnico: (id: string, tecnico: TecnicoAsignado | null) => void;
  eliminarTicket: (id: string) => void;
  restablecer: () => void;
}

export const useTicketsStore = create<TicketsState>()(
  // persist guarda el estado en AsyncStorage: si cerrás la app,
  // los tickets creados o modificados siguen estando al volver a abrirla.
  persist(
    (set, get) => ({
      tickets: ticketsIniciales,

      agregarTicket: (datos) => {
        const actuales = get().tickets;
        const nuevo: Ticket = {
          ...datos,
          id: Date.now().toString(),
          numero: siguienteNumero(actuales),
          estado: "Abierto",
          fecha: formatearFecha(new Date()),
          // avatar "aleatorio" pero estable para cada ticket nuevo
          avatar: `https://i.pravatar.cc/150?img=${(actuales.length % 70) + 1}`,
          tecnico: null,
        };
        // el más nuevo va primero en la lista
        set({ tickets: [nuevo, ...actuales] });
        return nuevo;
      },

      cambiarEstado: (id, estado) =>
        set((state) => ({
          tickets: state.tickets.map((t) => (t.id === id ? { ...t, estado } : t)),
        })),

      asignarTecnico: (id, tecnico) =>
        set((state) => ({
          tickets: state.tickets.map((t) => (t.id === id ? { ...t, tecnico } : t)),
        })),

      eliminarTicket: (id) =>
        set((state) => ({
          tickets: state.tickets.filter((t) => t.id !== id),
        })),

      restablecer: () => set({ tickets: ticketsIniciales }),
    }),
    {
      name: "mesa-de-ayuda-tickets",
      storage: createJSONStorage(() => AsyncStorage),
      // solo persistimos los datos, no las funciones
      partialize: (state) => ({ tickets: state.tickets }),
    }
  )
);

// Selector reutilizable: devuelve un ticket por id (o undefined si no existe).
export const useTicket = (id: string | undefined) =>
  useTicketsStore((state) => state.tickets.find((t) => t.id === id));
