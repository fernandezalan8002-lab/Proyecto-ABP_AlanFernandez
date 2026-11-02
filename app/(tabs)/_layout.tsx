import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { tema } from "../../constants/theme";
import { useTicketsStore } from "../../store/useTicketsStore";

// Navegación por pestañas (Tabs) dentro del grupo (tabs).
// Los paréntesis hacen que "(tabs)" NO forme parte de la URL.
export default function TabsLayout() {
  // Badge con la cantidad de tickets abiertos, leído del store global.
  const abiertos = useTicketsStore(
    (state) => state.tickets.filter((t) => t.estado === "Abierto").length
  );

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: tema.colores.primario,
        tabBarInactiveTintColor: tema.colores.textoTenue,
        tabBarStyle: { backgroundColor: tema.colores.superficie },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Tickets",
          tabBarBadge: abiertos > 0 ? abiertos : undefined,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="resumen"
        options={{
          title: "Resumen",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="pie-chart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="equipo"
        options={{
          title: "Equipo",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
