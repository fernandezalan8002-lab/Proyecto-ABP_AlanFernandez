import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

interface EstadoVacioProps {
  icono: React.ComponentProps<typeof Ionicons>["name"];
  titulo: string;
  mensaje?: string;
  children?: React.ReactNode;
}

// Mensaje para listas vacías, errores o "no encontrado".
export default function EstadoVacio({ icono, titulo, mensaje, children }: EstadoVacioProps) {
  return (
    <Contenedor>
      <Ionicons name={icono} size={48} color="#B0BAC5" />
      <Titulo>{titulo}</Titulo>
      {mensaje ? <Mensaje>{mensaje}</Mensaje> : null}
      {children}
    </Contenedor>
  );
}

const Contenedor = styled.View`
  align-items: center;
  padding: 40px 24px;
`;

const Titulo = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme.colores.texto};
  margin-top: 12px;
  text-align: center;
`;

const Mensaje = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.colores.textoTenue};
  margin-top: 6px;
  text-align: center;
`;
