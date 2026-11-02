import {
  ESTADOS,
  EstadoTicket,
  NuevoTicket,
  PrioridadTicket,
  Ticket,
} from "../constants/types";

// Funciones "puras": reciben datos y devuelven datos, sin tocar el estado
// ni la UI. Por eso son fáciles de reutilizar y de testear (ver __tests__/).

export type FiltroEstado = EstadoTicket | "Todos";
export type FiltroPrioridad = PrioridadTicket | "Todas";

export interface Filtros {
  busqueda: string;
  estado: FiltroEstado;
  prioridad: FiltroPrioridad;
}

// Normaliza un texto para comparar sin importar mayúsculas ni tildes.
// "Impresión" → "impresion"
export function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();
}

// Feature 3 y 4: buscar por número/título/solicitante y filtrar por estado y prioridad.
export function filtrarTickets(tickets: Ticket[], filtros: Filtros): Ticket[] {
  const termino = normalizar(filtros.busqueda).replace(/^#/, "");

  return tickets.filter((ticket) => {
    const coincideBusqueda =
      termino === "" ||
      normalizar(ticket.numero).includes(termino) ||
      normalizar(ticket.titulo).includes(termino) ||
      normalizar(ticket.solicitante).includes(termino);

    const coincideEstado =
      filtros.estado === "Todos" || ticket.estado === filtros.estado;

    const coincidePrioridad =
      filtros.prioridad === "Todas" || ticket.prioridad === filtros.prioridad;

    return coincideBusqueda && coincideEstado && coincidePrioridad;
  });
}

// Cuenta cuántos tickets hay en cada estado: { Abierto: 2, "En proceso": 1, ... }
export function contarPorEstado(tickets: Ticket[]): Record<EstadoTicket, number> {
  const conteo = { Abierto: 0, "En proceso": 0, Resuelto: 0 };
  tickets.forEach((t) => {
    conteo[t.estado] += 1;
  });
  return conteo;
}

// Arma las secciones que necesita un SectionList: [{ title, data }]
export function agruparPorEstado(
  tickets: Ticket[]
): { title: EstadoTicket; data: Ticket[] }[] {
  return ESTADOS.map((estado) => ({
    title: estado,
    data: tickets.filter((t) => t.estado === estado),
  })).filter((seccion) => seccion.data.length > 0);
}

// Calcula el próximo número de ticket a partir del más alto: "#1042" → "#1043"
export function siguienteNumero(tickets: Ticket[]): string {
  const maximo = tickets.reduce((max, t) => {
    const n = parseInt(t.numero.replace("#", ""), 10);
    return Number.isNaN(n) ? max : Math.max(max, n);
  }, 1000);
  return `#${maximo + 1}`;
}

// Formatea una fecha como dd/mm/aaaa
export function formatearFecha(fecha: Date): string {
  const dd = String(fecha.getDate()).padStart(2, "0");
  const mm = String(fecha.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${fecha.getFullYear()}`;
}

export type ErroresTicket = Partial<Record<keyof NuevoTicket, string>>;

// Validación del formulario: devuelve un objeto con los errores encontrados.
export function validarTicket(datos: NuevoTicket): ErroresTicket {
  const errores: ErroresTicket = {};
  if (datos.titulo.trim().length < 5) {
    errores.titulo = "El título debe tener al menos 5 caracteres.";
  }
  if (datos.solicitante.trim() === "") {
    errores.solicitante = "Ingresá el nombre del solicitante.";
  }
  if (datos.area.trim() === "") {
    errores.area = "Ingresá el área o centro de salud.";
  }
  return errores;
}
