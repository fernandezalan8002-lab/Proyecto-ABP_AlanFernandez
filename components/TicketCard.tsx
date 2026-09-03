import React from "react";
import styled from "styled-components/native";
import { EstadoTicket, PrioridadTicket } from "../constants/types";

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
}

// Colores según el estado del ticket.
const coloresEstado: Record<EstadoTicket, string> = {
  Abierto: "#E74C3C",
  "En proceso": "#F5A623",
  Resuelto: "#27AE60",
};

// Colores según la prioridad del ticket.
const coloresPrioridad: Record<PrioridadTicket, string> = {
  Alta: "#E74C3C",
  Media: "#F5A623",
  Baja: "#7F8C8D",
};

export default function TicketCard({
  numero,
  titulo,
  solicitante,
  area,
  estado,
  prioridad,
  fecha,
  avatar,
}: TicketCardProps) {
  return (
    <Card>
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
          <Badge color={coloresEstado[estado]}>
            <BadgeTexto>{estado}</BadgeTexto>
          </Badge>
          <Badge color={coloresPrioridad[prioridad]}>
            <BadgeTexto>Prioridad {prioridad}</BadgeTexto>
          </Badge>
        </FilaBadges>
      </Info>
    </Card>
  );
}

const Card = styled.View`
  flex-direction: row;
  background-color: #ffffff;
  border-radius: 14px;
  padding: 14px;
  margin-bottom: 14px;
`;

const Avatar = styled.Image`
  width: 52px;
  height: 52px;
  border-radius: 26px;
  margin-right: 12px;
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
  color: #7f8c8d;
`;

const Fecha = styled.Text`
  font-size: 12px;
  color: #7f8c8d;
`;

const Titulo = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #1e293b;
  margin-bottom: 4px;
`;

const Solicitante = styled.Text`
  font-size: 13px;
  color: #52606d;
  margin-bottom: 10px;
`;

const FilaBadges = styled.View`
  flex-direction: row;
`;

const Badge = styled.View<{ color: string }>`
  background-color: ${(props: { color: string }) => props.color};
  border-radius: 20px;
  padding: 4px 10px;
  margin-right: 8px;
`;

const BadgeTexto = styled.Text`
  color: #ffffff;
  font-size: 11px;
  font-weight: bold;
`;
