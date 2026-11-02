import React from "react";
import { Image, View } from "react-native";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface EncabezadoProps {
  titulo: string;
  subtitulo: string;
  avatar?: string;
  children?: React.ReactNode;
}

// Encabezado azul de las pestañas principales.
// useSafeAreaInsets nos da el alto de la barra de estado / notch del celular,
// así el contenido nunca queda tapado.
export default function Encabezado({ titulo, subtitulo, avatar, children }: EncabezadoProps) {
  const insets = useSafeAreaInsets();
  return (
    <Contenedor style={{ paddingTop: insets.top + 16 }}>
      <Fila>
        {avatar ? (
          <Image
            source={{ uri: avatar }}
            style={{ width: 44, height: 44, borderRadius: 22, marginRight: 12 }}
          />
        ) : null}
        <View style={{ flex: 1 }}>
          <Titulo>{titulo}</Titulo>
          <Subtitulo>{subtitulo}</Subtitulo>
        </View>
      </Fila>
      {children}
    </Contenedor>
  );
}

const Contenedor = styled.View`
  background-color: ${(props) => props.theme.colores.primario};
  padding: 0 20px 20px 20px;
  border-bottom-left-radius: ${(props) => props.theme.radios.grande}px;
  border-bottom-right-radius: ${(props) => props.theme.radios.grande}px;
  margin-bottom: 16px;
`;

const Fila = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Titulo = styled.Text`
  color: ${(props) => props.theme.colores.blanco};
  font-size: 18px;
  font-weight: bold;
`;

const Subtitulo = styled.Text`
  color: ${(props) => props.theme.colores.textoSobrePrimario};
  font-size: 13px;
`;
