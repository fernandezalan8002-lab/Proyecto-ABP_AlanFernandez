import { useTicketsStore } from "../store/useTicketsStore";
import { ticketsIniciales } from "../data/tickets";

// Antes de cada test volvemos a los datos iniciales para que no se afecten entre sí.
beforeEach(() => {
  useTicketsStore.getState().restablecer();
});

describe("useTicketsStore (Zustand)", () => {
  it("arranca con los tickets de ejemplo", () => {
    expect(useTicketsStore.getState().tickets).toHaveLength(ticketsIniciales.length);
  });

  it("agregarTicket crea un ticket abierto, numerado y al principio de la lista", () => {
    const nuevo = useTicketsStore.getState().agregarTicket({
      titulo: "Monitor no enciende",
      descripcion: "",
      solicitante: "Ana López",
      area: "Guardia",
      prioridad: "Alta",
    });

    const { tickets } = useTicketsStore.getState();
    expect(tickets).toHaveLength(ticketsIniciales.length + 1);
    expect(tickets[0]).toEqual(nuevo);
    expect(nuevo.estado).toBe("Abierto");
    expect(nuevo.numero).toBe("#1043");
    expect(nuevo.tecnico).toBeNull();
  });

  it("cambiarEstado modifica solo el ticket indicado", () => {
    useTicketsStore.getState().cambiarEstado("1", "Resuelto");
    const { tickets } = useTicketsStore.getState();
    expect(tickets.find((t) => t.id === "1")?.estado).toBe("Resuelto");
    expect(tickets.find((t) => t.id === "2")?.estado).toBe(ticketsIniciales[1].estado);
  });

  it("asignarTecnico asigna y quita un técnico", () => {
    useTicketsStore.getState().asignarTecnico("2", { id: 3, nombre: "Clementine Bauch" });
    expect(useTicketsStore.getState().tickets.find((t) => t.id === "2")?.tecnico?.nombre).toBe(
      "Clementine Bauch"
    );

    useTicketsStore.getState().asignarTecnico("2", null);
    expect(useTicketsStore.getState().tickets.find((t) => t.id === "2")?.tecnico).toBeNull();
  });

  it("eliminarTicket lo saca de la lista", () => {
    useTicketsStore.getState().eliminarTicket("3");
    const { tickets } = useTicketsStore.getState();
    expect(tickets).toHaveLength(ticketsIniciales.length - 1);
    expect(tickets.some((t) => t.id === "3")).toBe(false);
  });
});
