import React from "react";
import styled from "styled-components/native";

interface BadgeProps {
  texto: string;
  color: string;
}

// Etiqueta de color reutilizable (estado, prioridad, etc.).
export default function Badge({ texto, color }: BadgeProps) {
  return (
    <Contenedor color={color}>
      <Texto>{texto}</Texto>
    </Contenedor>
  );
}

const Contenedor = styled.View<{ color: string }>`
  background-color: ${(props) => props.color};
  border-radius: 20px;
  padding: 4px 10px;
  margin-right: 8px;
`;

const Texto = styled.Text`
  color: ${(props) => props.theme.colores.blanco};
  font-size: 11px;
  font-weight: bold;
`;
