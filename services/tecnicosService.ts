import { Tecnico } from "../constants/types";

// API pública de prueba. Usamos sus "users" como el equipo de técnicos de soporte.
const API_URL = "https://jsonplaceholder.typicode.com";

// Forma de cada usuario tal como lo devuelve la API (solo los campos que usamos).
interface UsuarioApi {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: { city: string };
}

// Transformamos la respuesta de la API al formato que usa la app.
export function aTecnico(usuario: UsuarioApi): Tecnico {
  return {
    id: usuario.id,
    nombre: usuario.name,
    usuario: usuario.username,
    email: usuario.email.toLowerCase(),
    telefono: usuario.phone.split(" ")[0],
    ciudad: usuario.address.city,
    avatar: `https://i.pravatar.cc/150?img=${usuario.id + 50}`,
  };
}

export async function fetchTecnicos(): Promise<Tecnico[]> {
  const respuesta = await fetch(`${API_URL}/users`);
  if (!respuesta.ok) {
    throw new Error(`No se pudo cargar el equipo (HTTP ${respuesta.status})`);
  }
  const usuarios: UsuarioApi[] = await respuesta.json();
  return usuarios.map(aTecnico);
}
