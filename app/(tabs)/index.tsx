import React, { useMemo, useState } from "react";
import { FlatList, View } from "react-native";
import styled from "styled-components/native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import TicketCard from "../../components/TicketCard";
import BarraBusqueda from "../../components/BarraBusqueda";
import FiltroChips from "../../components/FiltroChips";
import EstadoVacio from "../../components/EstadoVacio";
import Encabezado from "../../components/Encabezado";
import { useTicketsStore } from "../../store/useTicketsStore";
import { ESTADOS, PRIORIDADES } from "../../constants/types";
import { coloresEstado, coloresPrioridad } from "../../constants/theme";
import {
  FiltroEstado,
  FiltroPrioridad,
  filtrarTickets,
} from "../../utils/tickets";

const OPCIONES_ESTADO: FiltroEstado[] = ["Todos", ...ESTADOS];
const OPCIONES_PRIORIDAD: FiltroPrioridad[] = ["Todas", ...PRIORIDADES];

// Pantalla principal: listado de tickets con búsqueda y filtros.
export default function Home() {
  const router = useRouter();
  const tickets = useTicketsStore((state) => state.tickets);

  // Estado local de la pantalla (solo le importa a esta vista).
  const [busqueda, setBusqueda] = useState("");
  const [estado, setEstado] = useState<FiltroEstado>("Todos");
  const [prioridad, setPrioridad] = useState<FiltroPrioridad>("Todas");

  // useMemo: recalcula el filtrado solo cuando cambian los datos o los filtros.
  const ticketsFiltrados = useMemo(
    () => filtrarTickets(tickets, { busqueda, estado, prioridad }),
    [tickets, busqueda, estado, prioridad]
  );

  const hayFiltros = busqueda !== "" || estado !== "Todos" || prioridad !== "Todas";

  const limpiarFiltros = () => {
    setBusqueda("");
    setEstado("Todos");
    setPrioridad("Todas");
  };

  return (
    <Contenedor>
      <Encabezado
        titulo="Hola, Alan"
        subtitulo="Mesa de Ayuda · Sistemas"
        avatar="https://i.pravatar.cc/150?img=68"
      />

      <BarraBusqueda
        valor={busqueda}
        onChange={setBusqueda}
        placeholder="Buscar por número, título o solicitante"
      />

      <FiltroChips
        opciones={OPCIONES_ESTADO}
        seleccionado={estado}
        onChange={setEstado}
        colores={coloresEstado}
      />
      <View style={{ height: 6 }} />
      <FiltroChips
        opciones={OPCIONES_PRIORIDAD}
        seleccionado={prioridad}
        onChange={setPrioridad}
        colores={coloresPrioridad}
      />

      <FilaTitulo>
        <TituloSeccion>Tickets</TituloSeccion>
        <Contador>
          {ticketsFiltrados.length} de {tickets.length}
        </Contador>
      </FilaTitulo>

      {/* FlatList: renderiza solo lo visible → mejor rendimiento que ScrollView + map */}
      <FlatList
        data={ticketsFiltrados}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <TicketCard
            numero={item.numero}
            titulo={item.titulo}
            solicitante={item.solicitante}
            area={item.area}
            estado={item.estado}
            prioridad={item.prioridad}
            fecha={item.fecha}
            avatar={item.avatar}
            tecnico={item.tecnico?.nombre}
            // Navegación a la ruta dinámica pasando el id como parámetro
            onPress={() => router.push(`/ticket/${item.id}`)}
          />
        )}
        ListEmptyComponent={
          <EstadoVacio
            icono="search"
            titulo="No se encontraron tickets"
            mensaje={hayFiltros ? "Probá con otra búsqueda o quitá los filtros." : "Todavía no hay tickets cargados."}
          >
            {hayFiltros ? (
              <LinkLimpiar onPress={limpiarFiltros}>
                <LinkTexto>Limpiar filtros</LinkTexto>
              </LinkLimpiar>
            ) : null}
          </EstadoVacio>
        }
      />

      {/* Botón flotante para crear un ticket nuevo */}
      <BotonFlotante
        onPress={() => router.push("/nuevo")}
        accessibilityLabel="Nuevo ticket"
        accessibilityRole="button"
      >
        <Ionicons name="add" size={30} color="#FFFFFF" />
      </BotonFlotante>
    </Contenedor>
  );
}

const Contenedor = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colores.fondo};
`;

const FilaTitulo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 14px 20px 10px 20px;
`;

const TituloSeccion = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: ${(props) => props.theme.colores.texto};
`;

const Contador = styled.Text`
  font-size: 13px;
  color: ${(props) => props.theme.colores.textoTenue};
`;

const LinkLimpiar = styled.TouchableOpacity`
  margin-top: 12px;
`;

const LinkTexto = styled.Text`
  color: ${(props) => props.theme.colores.acento};
  font-weight: bold;
`;

const BotonFlotante = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 58px;
  height: 58px;
  border-radius: 29px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colores.acento};
  elevation: 5;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 6px;
  shadow-offset: 0px 3px;
`;
