import React from "react";
import { ScrollView } from "react-native";
import Chip from "./Chip";

interface FiltroChipsProps<T extends string> {
  opciones: T[];
  seleccionado: T;
  onChange: (valor: T) => void;
  colores?: Partial<Record<T, string>>;
}

// Fila horizontal de chips: se usa para filtrar por estado y por prioridad.
// Es genérico (<T>) para que sirva con cualquier lista de opciones.
export default function FiltroChips<T extends string>({
  opciones,
  seleccionado,
  onChange,
  colores,
}: FiltroChipsProps<T>) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      // flexGrow/flexShrink 0: el ScrollView horizontal ocupa solo el alto de los chips
      style={{ flexGrow: 0, flexShrink: 0 }}
      contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 4 }}
    >
      {opciones.map((opcion) => (
        <Chip
          key={opcion}
          texto={opcion}
          activo={opcion === seleccionado}
          color={colores?.[opcion]}
          onPress={() => onChange(opcion)}
        />
      ))}
    </ScrollView>
  );
}
