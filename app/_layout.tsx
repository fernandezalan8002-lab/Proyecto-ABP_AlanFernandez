import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { tema } from "../constants/theme";

// QueryClient de TanStack Query: maneja el caché de las peticiones HTTP.
// Se crea UNA sola vez, fuera del componente, y se comparte en toda la app.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 2 },
  },
});

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* ThemeProvider: todos los styled components acceden a props.theme */}
      <ThemeProvider theme={tema}>
        <SafeAreaProvider>
          <StatusBar style="light" />
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: tema.colores.primario },
              headerTintColor: tema.colores.blanco,
              headerTitleStyle: { fontWeight: "bold" },
              contentStyle: { backgroundColor: tema.colores.fondo },
            }}
          >
            {/* Grupo de pestañas: no muestra header propio del Stack */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            {/* Ruta dinámica: /ticket/1, /ticket/2, ... */}
            <Stack.Screen name="ticket/[id]" options={{ title: "Detalle del ticket" }} />
            {/* Formulario presentado como modal */}
            <Stack.Screen
              name="nuevo"
              options={{ title: "Nuevo ticket", presentation: "modal" }}
            />
          </Stack>
        </SafeAreaProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
