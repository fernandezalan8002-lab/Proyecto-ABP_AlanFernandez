import React, { useMemo } from "react";
import { Alert, SectionList, View } from "react-native";
import styled from "styled-components/native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Encabezado from "../../components/Encabezado";
import EstadoVacio from "../../components/EstadoVacio";
import { useTicketsStore } from "../../store/useTicketsStore";
import { ESTADOS } from "../../constants/types";
import { coloresEstado, coloresPrioridad, iconosEstado } from "../../constants/theme";
import { agruparPorEstado, contarPorEstado } from "../../utils/tickets";

// Resumen: contadores por estado + SectionList con los tickets agrupados.
export default function Resumen() {
  const router = useRouter();
  const tickets = useTicketsStore((state) => state.tickets);
  const restablecer = useTicketsStore((state) => state.restablecer);

  const conteo = useMemo(() => contarPorEstado(tickets), [tickets]);
  const secciones = useMemo(() => agruparPorEstado(tickets), [tickets]);
  const altaPrioridad = tickets.filter(
    (t) => t.prioridad === "Alta" && t.estado !== "Resuelto"
  ).length;

  const confirmarRestablecer = () => {
    Alert.alert(
      "Restablecer datos",
      "Se van a borrar los cambios y volver a los tickets de ejemplo.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Restablecer", style: "destructive", onPress: restablecer },
      ]
    );
  };

  return (
    <Contenedor>
      <Encabezado titulo="Resumen" subtitulo={`${tickets.length} tickets en total`}>
        <FilaTarjetas>
          {ESTADOS.map((estado) => (
            <Tarjeta key={estado}>
              <Ionicons name={iconosEstado[estado]} size={20} color={coloresEstado[estado]} />
              <Cantidad>{conteo[estado]}</Cantidad>
              <Etiqueta>{estado}</Etiqueta>
            </Tarjeta>
          ))}
        </FilaTarjetas>
        {altaPrioridad > 0 ? (
          <Aviso>
            <Ionicons name="warning" size={16} color="#F5A623" />
            <AvisoTexto>
              {altaPrioridad} ticket{altaPrioridad > 1 ? "s" : ""} de prioridad alta sin resolver
            </AvisoTexto>
          </Aviso>
        ) : null}
      </Encabezado>

      {/* SectionList: lista agrupada en secciones (una por estado) */}
      <SectionList
        sections={secciones}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
        renderSectionHeader={({ section }) => (
          <CabeceraSeccion>
            <Punto style={{ backgroundColor: coloresEstado[section.title] }} />
            <TituloSeccion>
              {section.title} ({section.data.length})
            </TituloSeccion>
          </CabeceraSeccion>
        )}
        renderItem={({ item }) => (
          <Fila onPress={() => router.push(`/ticket/${item.id}`)}>
            <View style={{ flex: 1 }}>
              <FilaTitulo numberOfLines={1}>
                {item.numero} · {item.titulo}
              </FilaTitulo>
              <FilaSub>
                {item.tecnico ? `Asignado a ${item.tecnico.nombre}` : "Sin asignar"}
              </FilaSub>
            </View>
            <Ionicons name="flag" size={16} color={coloresPrioridad[item.prioridad]} />
          </Fila>
        )}
        ListEmptyComponent={<EstadoVacio icono="file-tray-outline" titulo="No hay tickets" />}
        ListFooterComponent={
          <BotonRestablecer onPress={confirmarRestablecer}>
            <Ionicons name="refresh" size={16} color="#7F8C8D" />
            <TextoRestablecer>Restablecer datos de ejemplo</TextoRestablecer>
          </BotonRestablecer>
        }
      />
    </Contenedor>
  );
}

const Contenedor = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colores.fondo};
`;

const FilaTarjetas = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 16px;
`;

const Tarjeta = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${(props) => props.theme.colores.superficie};
  border-radius: 12px;
  padding: 12px 4px;
  margin: 0 4px;
`;

const Cantidad = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${(props) => props.theme.colores.texto};
  margin-top: 4px;
`;

const Etiqueta = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.colores.textoTenue};
`;

const Aviso = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 14px;
`;

const AvisoTexto = styled.Text`
  color: ${(props) => props.theme.colores.blanco};
  font-size: 13px;
  margin-left: 6px;
`;

const CabeceraSeccion = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 12px 0 8px 0;
`;

const Punto = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  margin-right: 8px;
`;

const TituloSeccion = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: ${(props) => props.theme.colores.texto};
`;

const Fila = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.theme.colores.superficie};
  border-radius: 10px;
  padding: 12px 14px;
  margin-bottom: 8px;
`;

const FilaTitulo = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => props.theme.colores.texto};
`;

const FilaSub = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.colores.textoTenue};
  margin-top: 2px;
`;

const BotonRestablecer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px;
  margin-top: 8px;
`;

const TextoRestablecer = styled.Text`
  color: ${(props) => props.theme.colores.textoTenue};
  margin-left: 6px;
`;
