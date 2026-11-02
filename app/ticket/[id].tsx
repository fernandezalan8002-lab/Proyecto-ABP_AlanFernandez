import React from "react";
import { ActivityIndicator, Alert, ScrollView, View } from "react-native";
import styled from "styled-components/native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Badge from "../../components/Badge";
import Chip from "../../components/Chip";
import Boton from "../../components/Boton";
import EstadoVacio from "../../components/EstadoVacio";
import { useTicket, useTicketsStore } from "../../store/useTicketsStore";
import { useTecnicos } from "../../hooks/useTecnicos";
import { ESTADOS } from "../../constants/types";
import { coloresEstado, coloresPrioridad } from "../../constants/theme";

// Pantalla de detalle — RUTA DINÁMICA.
// El archivo se llama [id].tsx, así que /ticket/3 abre esta pantalla con id = "3".
export default function DetalleTicket() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  // Leemos el ticket del store global usando el id recibido por parámetro.
  const ticket = useTicket(id);
  const cambiarEstado = useTicketsStore((state) => state.cambiarEstado);
  const asignarTecnico = useTicketsStore((state) => state.asignarTecnico);
  const eliminarTicket = useTicketsStore((state) => state.eliminarTicket);

  // Técnicos desde la API (misma query y mismo caché que la pestaña Equipo).
  const { data: tecnicos, isLoading, error } = useTecnicos();

  if (!ticket) {
    return (
      <EstadoVacio
        icono="alert-circle-outline"
        titulo="Ticket no encontrado"
        mensaje="Puede que haya sido eliminado."
      >
        <Boton texto="Volver" variante="secundario" onPress={() => router.back()} />
      </EstadoVacio>
    );
  }

  const confirmarEliminar = () => {
    Alert.alert("Eliminar ticket", `¿Seguro que querés eliminar el ticket ${ticket.numero}?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => {
          router.back();
          eliminarTicket(ticket.id);
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
      {/* Cambiamos el título del header dinámicamente según el ticket */}
      <Stack.Screen options={{ title: `Ticket ${ticket.numero}` }} />

      <Tarjeta>
        <Fecha>Creado el {ticket.fecha}</Fecha>
        <Titulo>{ticket.titulo}</Titulo>
        <FilaBadges>
          <Badge texto={ticket.estado} color={coloresEstado[ticket.estado]} />
          <Badge texto={`Prioridad ${ticket.prioridad}`} color={coloresPrioridad[ticket.prioridad]} />
        </FilaBadges>

        <Etiqueta>Descripción</Etiqueta>
        <Texto>{ticket.descripcion || "Sin descripción."}</Texto>
      </Tarjeta>

      <Tarjeta>
        <Etiqueta>Solicitante</Etiqueta>
        <Fila>
          <Avatar source={{ uri: ticket.avatar }} />
          <View>
            <Nombre>{ticket.solicitante}</Nombre>
            <Texto>
              <Ionicons name="business-outline" size={13} /> {ticket.area}
            </Texto>
          </View>
        </Fila>
      </Tarjeta>

      <Tarjeta>
        <Etiqueta>Estado</Etiqueta>
        <FilaChips>
          {ESTADOS.map((estado) => (
            <Chip
              key={estado}
              texto={estado}
              activo={ticket.estado === estado}
              color={coloresEstado[estado]}
              onPress={() => cambiarEstado(ticket.id, estado)}
            />
          ))}
        </FilaChips>
      </Tarjeta>

      <Tarjeta>
        <Etiqueta>Técnico asignado</Etiqueta>
        <Texto style={{ marginBottom: 10 }}>
          {ticket.tecnico ? ticket.tecnico.nombre : "Sin asignar"}
        </Texto>

        {isLoading && <ActivityIndicator color="#1B2A4A" />}
        {error && <TextoError>No se pudo cargar la lista de técnicos.</TextoError>}
        {tecnicos && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {ticket.tecnico ? (
              <Chip
                texto="Quitar"
                activo={false}
                onPress={() => asignarTecnico(ticket.id, null)}
              />
            ) : null}
            {tecnicos.map((tecnico) => (
              <Chip
                key={tecnico.id}
                texto={tecnico.nombre}
                activo={ticket.tecnico?.id === tecnico.id}
                onPress={() =>
                  asignarTecnico(ticket.id, { id: tecnico.id, nombre: tecnico.nombre })
                }
              />
            ))}
          </ScrollView>
        )}
      </Tarjeta>

      <Boton texto="Eliminar ticket" icono="trash-outline" variante="peligro" onPress={confirmarEliminar} />
    </ScrollView>
  );
}

const Tarjeta = styled.View`
  background-color: ${(props) => props.theme.colores.superficie};
  border-radius: ${(props) => props.theme.radios.medio}px;
  padding: 16px;
  margin-bottom: 14px;
`;

const Fecha = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.colores.textoTenue};
`;

const Titulo = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.colores.texto};
  margin: 6px 0 10px 0;
`;

const FilaBadges = styled.View`
  flex-direction: row;
  margin-bottom: 14px;
`;

const Etiqueta = styled.Text`
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${(props) => props.theme.colores.textoTenue};
  margin-bottom: 8px;
`;

const Texto = styled.Text`
  font-size: 14px;
  line-height: 20px;
  color: ${(props) => props.theme.colores.textoSecundario};
`;

const TextoError = styled.Text`
  font-size: 13px;
  color: ${(props) => props.theme.colores.peligro};
`;

const Fila = styled.View`
  flex-direction: row;
  align-items: center;
`;

const FilaChips = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const Avatar = styled.Image`
  width: 46px;
  height: 46px;
  border-radius: 23px;
  margin-right: 12px;
`;

const Nombre = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: ${(props) => props.theme.colores.texto};
`;
