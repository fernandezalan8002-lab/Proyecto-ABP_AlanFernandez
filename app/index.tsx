import React from "react";
import { View, Text, Image, ScrollView, StatusBar } from "react-native";
import styled from "styled-components/native";
import TicketCard from "../components/TicketCard";
import { tickets } from "../data/tickets";

export default function Home() {
  return (
    <Contenedor>
      <StatusBar barStyle="light-content" />

      {/* Encabezado de la pantalla principal */}
      <Header>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=68" }}
          style={{ width: 44, height: 44, borderRadius: 22 }}
        />
        <View style={{ marginLeft: 12 }}>
          <Saludo>Hola, Alan</Saludo>
          <Subtitulo>Mesa de Ayuda · Sistemas</Subtitulo>
        </View>
      </Header>

      <TituloSeccion>Tickets recientes</TituloSeccion>

      {/* Listado con datos estáticos usando ScrollView */}
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            numero={ticket.numero}
            titulo={ticket.titulo}
            solicitante={ticket.solicitante}
            area={ticket.area}
            estado={ticket.estado}
            prioridad={ticket.prioridad}
            fecha={ticket.fecha}
            avatar={ticket.avatar}
          />
        ))}

        <Text style={{ textAlign: "center", color: "#95A5A6", marginTop: 8 }}>
          {tickets.length} tickets en total
        </Text>
      </ScrollView>
    </Contenedor>
  );
}

const Contenedor = styled.View`
  flex: 1;
  background-color: #f5f7fa;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #1b2a4a;
  padding: 60px 20px 24px 20px;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  margin-bottom: 16px;
`;

const Saludo = styled.Text`
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
`;

const Subtitulo = styled.Text`
  color: #a9b4c9;
  font-size: 13px;
`;

const TituloSeccion = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: #1e293b;
  margin: 0 20px 12px 20px;
`;
