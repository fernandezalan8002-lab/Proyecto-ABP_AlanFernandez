import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

interface BotonProps {
  texto: string;
  onPress: () => void;
  icono?: React.ComponentProps<typeof Ionicons>["name"];
  variante?: "primario" | "peligro" | "secundario";
  deshabilitado?: boolean;
}

// Botón reutilizable con variantes de color.
export default function Boton({
  texto,
  onPress,
  icono,
  variante = "primario",
  deshabilitado = false,
}: BotonProps) {
  const colorTexto = variante === "secundario" ? "#1B2A4A" : "#FFFFFF";
  return (
    <Contenedor
      variante={variante}
      onPress={onPress}
      disabled={deshabilitado}
      style={{ opacity: deshabilitado ? 0.5 : 1 }}
      accessibilityRole="button"
    >
      {icono ? <Ionicons name={icono} size={18} color={colorTexto} /> : null}
      <Texto style={{ color: colorTexto }}>{texto}</Texto>
    </Contenedor>
  );
}

const Contenedor = styled.TouchableOpacity<{ variante: string }>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 14px;
  border-radius: 12px;
  margin-top: 12px;
  border-width: 1px;
  border-color: ${(props) =>
    props.variante === "peligro"
      ? props.theme.colores.peligro
      : props.theme.colores.primario};
  background-color: ${(props) =>
    props.variante === "peligro"
      ? props.theme.colores.peligro
      : props.variante === "secundario"
      ? "transparent"
      : props.theme.colores.primario};
`;

const Texto = styled.Text`
  font-size: 15px;
  font-weight: bold;
  margin-left: 6px;
`;
