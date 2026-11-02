import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import { tema } from "../constants/theme";
import TicketCard from "../components/TicketCard";
import FiltroChips from "../components/FiltroChips";
import BarraBusqueda from "../components/BarraBusqueda";

// Los styled components leen props.theme, así que envolvemos con el ThemeProvider.
const renderConTema = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={tema}>{ui}</ThemeProvider>);

describe("TicketCard", () => {
  const props = {
    numero: "#1050",
    titulo: "No anda el wifi",
    solicitante: "Juan Pérez",
    area: "Guardia",
    estado: "Abierto" as const,
    prioridad: "Alta" as const,
    fecha: "10/10/2026",
    avatar: "https://i.pravatar.cc/150?img=1",
  };

  it("muestra los datos recibidos por props", async () => {
    await renderConTema(<TicketCard {...props} />);
    expect(screen.getByText("#1050")).toBeTruthy();
    expect(screen.getByText("No anda el wifi")).toBeTruthy();
    expect(screen.getByText("Abierto")).toBeTruthy();
    expect(screen.getByText("Prioridad Alta")).toBeTruthy();
  });

  it("muestra el técnico solo si está asignado", async () => {
    await renderConTema(<TicketCard {...props} />);
    expect(screen.queryByText("Ana Técnica")).toBeNull();

    await renderConTema(<TicketCard {...props} tecnico="Ana Técnica" />);
    expect(screen.getByText("Ana Técnica")).toBeTruthy();
  });

  it("llama a onPress al tocar la tarjeta", async () => {
    const onPress = jest.fn();
    await renderConTema(<TicketCard {...props} onPress={onPress} />);
    await fireEvent.press(screen.getByText("No anda el wifi"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe("FiltroChips", () => {
  it("avisa qué opción se eligió", async () => {
    const onChange = jest.fn();
    await renderConTema(
      <FiltroChips opciones={["Todos", "Abierto", "Resuelto"]} seleccionado="Todos" onChange={onChange} />
    );
    await fireEvent.press(screen.getByText("Resuelto"));
    expect(onChange).toHaveBeenCalledWith("Resuelto");
  });
});

describe("BarraBusqueda", () => {
  it("informa el texto escrito", async () => {
    const onChange = jest.fn();
    await renderConTema(<BarraBusqueda valor="" onChange={onChange} />);
    await fireEvent.changeText(screen.getByTestId("input-busqueda"), "impresora");
    expect(onChange).toHaveBeenCalledWith("impresora");
  });
});
