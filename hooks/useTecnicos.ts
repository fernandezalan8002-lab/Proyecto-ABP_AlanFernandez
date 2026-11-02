import { useQuery } from "@tanstack/react-query";
import { fetchTecnicos } from "../services/tecnicosService";

// Hook reutilizable con TanStack Query.
// Lo usan la pestaña "Equipo" y la pantalla de detalle (para asignar técnico).
// Como ambas usan la misma queryKey, la petición se hace UNA vez y se
// comparte desde el caché.
export function useTecnicos() {
  return useQuery({
    queryKey: ["tecnicos"],
    queryFn: fetchTecnicos,
    staleTime: 1000 * 60 * 5, // 5 minutos: no vuelve a pedir datos "frescos"
  });
}
