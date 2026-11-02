import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

interface BarraBusquedaProps {
  valor: string;
  onChange: (texto: string) => void;
  placeholder?: string;
}

// Input de búsqueda con ícono y botón para limpiar.
export default function BarraBusqueda({ valor, onChange, placeholder }: BarraBusquedaProps) {
  return (
    <Contenedor>
      <Ionicons name="search" size={18} color="#7F8C8D" />
      <Input
        value={valor}
        onChangeText={onChange}
        placeholder={placeholder ?? "Buscar..."}
        placeholderTextColor="#95A5A6"
        autoCorrect={false}
        returnKeyType="search"
        testID="input-busqueda"
      />
      {valor.length > 0 && (
        <TouchableOpacity onPress={() => onChange("")} accessibilityLabel="Limpiar búsqueda">
          <Ionicons name="close-circle" size={18} color="#95A5A6" />
        </TouchableOpacity>
      )}
    </Contenedor>
  );
}

const Contenedor = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.theme.colores.superficie};
  border-radius: 12px;
  padding: 0 12px;
  margin: 0 20px 10px 20px;
  border-width: 1px;
  border-color: ${(props) => props.theme.colores.borde};
`;

const Input = styled.TextInput`
  flex: 1;
  padding: 10px 8px;
  font-size: 15px;
  color: ${(props) => props.theme.colores.texto};
`;
