import React from "react";
import styled from "styled-components/native";

interface ChipProps {
  texto: string;
  activo: boolean;
  onPress: () => void;
  color?: string; // color cuando está activo
}

// Botón tipo "pastilla" para filtros y selectores.
export default function Chip({ texto, activo, onPress, color }: ChipProps) {
  return (
    <Contenedor
      activo={activo}
      color={color}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: activo }}
    >
      <Texto activo={activo}>{texto}</Texto>
    </Contenedor>
  );
}

const Contenedor = styled.TouchableOpacity<{ activo: boolean; color?: string }>`
  padding: 7px 14px;
  border-radius: 20px;
  margin-right: 8px;
  border-width: 1px;
  border-color: ${(props) =>
    props.activo ? props.color ?? props.theme.colores.primario : props.theme.colores.borde};
  background-color: ${(props) =>
    props.activo ? props.color ?? props.theme.colores.primario : props.theme.colores.superficie};
`;

const Texto = styled.Text<{ activo: boolean }>`
  font-size: 13px;
  font-weight: ${(props) => (props.activo ? "bold" : "normal")};
  color: ${(props) =>
    props.activo ? props.theme.colores.blanco : props.theme.colores.textoSecundario};
`;
