import { ticketsIniciales } from "../data/tickets";
import {
  agruparPorEstado,
  contarPorEstado,
  filtrarTickets,
  formatearFecha,
  normalizar,
  siguienteNumero,
  validarTicket,
} from "../utils/tickets";

const sinFiltros = { busqueda: "", estado: "Todos", prioridad: "Todas" } as const;

describe("filtrarTickets", () => {
  it("sin filtros devuelve todos los tickets", () => {
    expect(filtrarTickets(ticketsIniciales, sinFiltros)).toHaveLength(ticketsIniciales.length);
  });

  it("busca por título sin importar mayúsculas ni tildes", () => {
    const resultado = filtrarTickets(ticketsIniciales, { ...sinFiltros, busqueda: "IMPRESORA" });
    expect(resultado).toHaveLength(1);
    expect(resultado[0].numero).toBe("#1041");

    const conTilde = filtrarTickets(ticketsIniciales, { ...sinFiltros, busqueda: "clinica" });
    expect(conTilde[0].titulo).toContain("clínica");
  });

  it("busca por número con o sin #", () => {
    expect(filtrarTickets(ticketsIniciales, { ...sinFiltros, busqueda: "#1039" })).toHaveLength(1);
    expect(filtrarTickets(ticketsIniciales, { ...sinFiltros, busqueda: "1039" })).toHaveLength(1);
  });

  it("busca por solicitante", () => {
    const resultado = filtrarTickets(ticketsIniciales, { ...sinFiltros, busqueda: "gomez" });
    expect(resultado[0].solicitante).toBe("María Gómez");
  });

  it("filtra por estado y prioridad combinados", () => {
    const resultado = filtrarTickets(ticketsIniciales, {
      busqueda: "",
      estado: "Abierto",
      prioridad: "Alta",
    });
    expect(resultado.length).toBeGreaterThan(0);
    resultado.forEach((t) => {
      expect(t.estado).toBe("Abierto");
      expect(t.prioridad).toBe("Alta");
    });
  });

  it("devuelve lista vacía si nada coincide", () => {
    expect(filtrarTickets(ticketsIniciales, { ...sinFiltros, busqueda: "zzzz" })).toEqual([]);
  });
});

describe("contarPorEstado y agruparPorEstado", () => {
  it("cuenta los tickets de cada estado", () => {
    const conteo = contarPorEstado(ticketsIniciales);
    expect(conteo.Abierto + conteo["En proceso"] + conteo.Resuelto).toBe(ticketsIniciales.length);
  });

  it("arma secciones para el SectionList sin secciones vacías", () => {
    const soloAbiertos = ticketsIniciales.filter((t) => t.estado === "Abierto");
    const secciones = agruparPorEstado(soloAbiertos);
    expect(secciones).toHaveLength(1);
    expect(secciones[0].title).toBe("Abierto");
    expect(secciones[0].data).toHaveLength(soloAbiertos.length);
  });
});

describe("helpers", () => {
  it("siguienteNumero toma el número más alto y le suma uno", () => {
    expect(siguienteNumero(ticketsIniciales)).toBe("#1043");
    expect(siguienteNumero([])).toBe("#1001");
  });

  it("formatearFecha devuelve dd/mm/aaaa", () => {
    expect(formatearFecha(new Date(2026, 8, 5))).toBe("05/09/2026");
  });

  it("normalizar quita tildes y mayúsculas", () => {
    expect(normalizar("  Impresión ")).toBe("impresion");
  });
});

describe("validarTicket", () => {
  it("marca los campos obligatorios vacíos", () => {
    const errores = validarTicket({
      titulo: "abc",
      descripcion: "",
      solicitante: "",
      area: "",
      prioridad: "Media",
    });
    expect(Object.keys(errores).sort()).toEqual(["area", "solicitante", "titulo"]);
  });

  it("no devuelve errores si los datos son válidos", () => {
    const errores = validarTicket({
      titulo: "No anda el mouse",
      descripcion: "",
      solicitante: "Ana",
      area: "Guardia",
      prioridad: "Baja",
    });
    expect(errores).toEqual({});
  });
});
