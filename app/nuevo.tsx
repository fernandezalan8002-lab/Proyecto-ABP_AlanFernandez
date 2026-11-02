import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import styled from "styled-components/native";
import { useRouter } from "expo-router";
import Chip from "../components/Chip";
import Boton from "../components/Boton";
import { useTicketsStore } from "../store/useTicketsStore";
import { NuevoTicket, PRIORIDADES, PrioridadTicket } from "../constants/types";
import { ErroresTicket, validarTicket } from "../utils/tickets";
import { coloresPrioridad } from "../constants/theme";

// Formulario para dar de alta un ticket nuevo (se abre como modal).
export default function NuevoTicketScreen() {
  const router = useRouter();
  const agregarTicket = useTicketsStore((state) => state.agregarTicket);

  // Estado controlado de cada campo
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [solicitante, setSolicitante] = useState("");
  const [area, setArea] = useState("");
  const [prioridad, setPrioridad] = useState<PrioridadTicket>("Media");
  const [errores, setErrores] = useState<ErroresTicket>({});

  const guardar = () => {
    const datos: NuevoTicket = {
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      solicitante: solicitante.trim(),
      area: area.trim(),
      prioridad,
    };
    const encontrados = validarTicket(datos);
    setErrores(encontrados);
    if (Object.keys(encontrados).length > 0) return;

    const nuevo = agregarTicket(datos);
    // replace: reemplaza el formulario por el detalle (así "volver" no regresa al form)
    router.replace(`/ticket/${nuevo.id}`);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={{ padding: 20 }} keyboardShouldPersistTaps="handled">
        <Etiqueta>Título *</Etiqueta>
        <Input
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Ej: No funciona la impresora"
          placeholderTextColor="#95A5A6"
          conError={!!errores.titulo}
          testID="input-titulo"
        />
        {errores.titulo ? <Error>{errores.titulo}</Error> : null}

        <Etiqueta>Descripción</Etiqueta>
        <Input
          value={descripcion}
          onChangeText={setDescripcion}
          placeholder="Contá qué pasa, desde cuándo, a quién afecta..."
          placeholderTextColor="#95A5A6"
          multiline
          numberOfLines={4}
          style={{ minHeight: 96, textAlignVertical: "top" }}
          conError={false}
          testID="input-descripcion"
        />

        <Etiqueta>Solicitante *</Etiqueta>
        <Input
          value={solicitante}
          onChangeText={setSolicitante}
          placeholder="Nombre y apellido"
          placeholderTextColor="#95A5A6"
          conError={!!errores.solicitante}
          testID="input-solicitante"
        />
        {errores.solicitante ? <Error>{errores.solicitante}</Error> : null}

        <Etiqueta>Área / Centro de salud *</Etiqueta>
        <Input
          value={area}
          onChangeText={setArea}
          placeholder="Ej: Hospital Central"
          placeholderTextColor="#95A5A6"
          conError={!!errores.area}
          testID="input-area"
        />
        {errores.area ? <Error>{errores.area}</Error> : null}

        <Etiqueta>Prioridad</Etiqueta>
        <FilaChips>
          {PRIORIDADES.map((p) => (
            <Chip
              key={p}
              texto={p}
              activo={prioridad === p}
              color={coloresPrioridad[p]}
              onPress={() => setPrioridad(p)}
            />
          ))}
        </FilaChips>

        <Boton texto="Crear ticket" icono="checkmark" onPress={guardar} />
        <Boton texto="Cancelar" variante="secundario" onPress={() => router.back()} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const Etiqueta = styled.Text`
  font-size: 13px;
  font-weight: bold;
  color: ${(props) => props.theme.colores.texto};
  margin: 14px 0 6px 0;
`;

const Input = styled.TextInput<{ conError: boolean }>`
  background-color: ${(props) => props.theme.colores.superficie};
  border-width: 1px;
  border-color: ${(props) =>
    props.conError ? props.theme.colores.peligro : props.theme.colores.borde};
  border-radius: 10px;
  padding: 12px;
  font-size: 15px;
  color: ${(props) => props.theme.colores.texto};
`;

const Error = styled.Text`
  color: ${(props) => props.theme.colores.peligro};
  font-size: 12px;
  margin-top: 4px;
`;

const FilaChips = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;
