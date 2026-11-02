import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { EstadoTicket, PrioridadTicket } from "../constants/types";
import { coloresEstado, coloresPrioridad } from "../constants/theme";
import Badge from "./Badge";

// Componente reutilizable que representa UN ticket en el listado.
// Toda la información se recibe por props: ningún dato queda
// "hardcodeado" dentro del componente, así se puede reutilizar
// con cualquier ticket que le pasemos.
interface TicketCardProps {
  numero: string;
  titulo: string;
  solicitante: string;
  area: string;
  estado: EstadoTicket;
  prioridad: PrioridadTicket;
  fecha: string;
  avatar: string;
  tecnico?: string | null;
  onPress?: () => void;
}

export default function TicketCard({
  numero,
  titulo,
  solicitante,
  area,
  estado,
  prioridad,
  fecha,
  avatar,
  tecnico,
  onPress,
}: TicketCardProps) {
  return (
    <Card
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`Ticket ${numero}: ${titulo}`}
    >
      <Avatar source={{ uri: avatar }} />

      <Info>
        <FilaSuperior>
          <Numero>{numero}</Numero>
          <Fecha>{fecha}</Fecha>
        </FilaSuperior>

        <Titulo numberOfLines={2}>{titulo}</Titulo>
        <Solicitante>
          {solicitante} · {area}
        </Solicitante>

        <FilaBadges>
          <Badge texto={estado} color={coloresEstado[estado]} />
          <Badge texto={`Prioridad ${prioridad}`} color={coloresPrioridad[prioridad]} />
        </FilaBadges>

        {/* Renderizado condicional: solo si tiene técnico asignado */}
        {tecnico ? (
          <FilaTecnico>
            <Ionicons name="person-circle-outline" size={14} color="#52606D" />
            <TextoTecnico>{tecnico}</TextoTecnico>
          </FilaTecnico>
        ) : null}
      </Info>

      {onPress ? <Ionicons name="chevron-forward" size={18} color="#B0BAC5" /> : null}
    </Card>
  );
}

const Card = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.theme.colores.superficie};
  border-radius: ${(props) => props.theme.radios.medio}px;
  padding: 14px;
  margin-bottom: 14px;
  elevation: 2;
  shadow-color: #000;
  shadow-opacity: 0.06;
  shadow-radius: 6px;
  shadow-offset: 0px 2px;
`;

const Avatar = styled.Image`
  width: 52px;
  height: 52px;
  border-radius: 26px;
  margin-right: 12px;
  align-self: flex-start;
`;

const Info = styled.View`
  flex: 1;
`;

const FilaSuperior = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const Numero = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${(props) => props.theme.colores.textoTenue};
`;

const Fecha = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.colores.textoTenue};
`;

const Titulo = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: ${(props) => props.theme.colores.texto};
  margin-bottom: 4px;
`;

const Solicitante = styled.Text`
  font-size: 13px;
  color: ${(props) => props.theme.colores.textoSecundario};
  margin-bottom: 10px;
`;

const FilaBadges = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const FilaTecnico = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

const TextoTecnico = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.colores.textoSecundario};
  margin-left: 4px;
`;
