import React from "react";
import { ActivityIndicator, FlatList, Linking } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import Encabezado from "../../components/Encabezado";
import EstadoVacio from "../../components/EstadoVacio";
import Boton from "../../components/Boton";
import { useTecnicos } from "../../hooks/useTecnicos";
import { useTicketsStore } from "../../store/useTicketsStore";

// Equipo de soporte: datos traídos de una API con TanStack Query.
// Combina datos remotos (técnicos) con el estado global (tickets asignados).
export default function Equipo() {
  const { data, isLoading, error, refetch, isRefetching } = useTecnicos();
  const tickets = useTicketsStore((state) => state.tickets);

  // Cuántos tickets SIN resolver tiene asignados cada técnico
  const asignados = (idTecnico: number) =>
    tickets.filter((t) => t.tecnico?.id === idTecnico && t.estado !== "Resuelto").length;

  return (
    <Contenedor>
      <Encabezado
        titulo="Equipo de soporte"
        subtitulo={data ? `${data.length} técnicos disponibles` : "Cargando equipo..."}
      />

      {/* Estado 1: cargando */}
      {isLoading && (
        <Centro>
          <ActivityIndicator size="large" color="#1B2A4A" />
          <TextoCarga>Cargando técnicos...</TextoCarga>
        </Centro>
      )}

      {/* Estado 2: error (sin conexión, API caída, etc.) */}
      {error && !isLoading && (
        <EstadoVacio
          icono="cloud-offline-outline"
          titulo="No se pudo cargar el equipo"
          mensaje="Revisá tu conexión a internet e intentá de nuevo."
        >
          <Boton texto="Reintentar" icono="refresh" onPress={() => refetch()} />
        </EstadoVacio>
      )}

      {/* Estado 3: datos listos */}
      {data && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
          // "Deslizar para actualizar": vuelve a pedir los datos a la API
          refreshing={isRefetching}
          onRefresh={refetch}
          renderItem={({ item }) => {
            const cantidad = asignados(item.id);
            return (
              <Tarjeta>
                <Avatar source={{ uri: item.avatar }} />
                <Info>
                  <Nombre>{item.nombre}</Nombre>
                  <Detalle>
                    @{item.usuario} · {item.ciudad}
                  </Detalle>
                  <FilaContacto onPress={() => Linking.openURL(`mailto:${item.email}`)}>
                    <Ionicons name="mail-outline" size={14} color="#3B82F6" />
                    <Contacto>{item.email}</Contacto>
                  </FilaContacto>
                </Info>
                <Carga activo={cantidad > 0}>
                  <CargaNumero activo={cantidad > 0}>{cantidad}</CargaNumero>
                  <CargaTexto activo={cantidad > 0}>activos</CargaTexto>
                </Carga>
              </Tarjeta>
            );
          }}
        />
      )}
    </Contenedor>
  );
}

const Contenedor = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colores.fondo};
`;

const Centro = styled.View`
  align-items: center;
  padding: 40px;
`;

const TextoCarga = styled.Text`
  margin-top: 12px;
  color: ${(props) => props.theme.colores.textoTenue};
`;

const Tarjeta = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.theme.colores.superficie};
  border-radius: ${(props) => props.theme.radios.medio}px;
  padding: 14px;
  margin-bottom: 12px;
`;

const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 12px;
`;

const Info = styled.View`
  flex: 1;
`;

const Nombre = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: ${(props) => props.theme.colores.texto};
`;

const Detalle = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.colores.textoTenue};
  margin: 2px 0 4px 0;
`;

const FilaContacto = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const Contacto = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.colores.acento};
  margin-left: 4px;
`;

const Carga = styled.View<{ activo: boolean }>`
  align-items: center;
  justify-content: center;
  width: 58px;
  padding: 6px 0;
  border-radius: 10px;
  background-color: ${(props) => (props.activo ? props.theme.colores.primario : props.theme.colores.fondo)};
`;

const CargaNumero = styled.Text<{ activo: boolean }>`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => (props.activo ? props.theme.colores.blanco : props.theme.colores.textoTenue)};
`;

const CargaTexto = styled.Text<{ activo: boolean }>`
  font-size: 10px;
  color: ${(props) => (props.activo ? props.theme.colores.textoSobrePrimario : props.theme.colores.textoTenue)};
`;
