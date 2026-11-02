import { Ticket } from "../constants/types";

// Datos iniciales (mock) de la app.
// Se cargan en el store de Zustand la primera vez que se abre la app;
// a partir de ahí los cambios se guardan en el dispositivo (AsyncStorage).
export const ticketsIniciales: Ticket[] = [
  {
    id: "1",
    numero: "#1042",
    titulo: "No puedo acceder al sistema de turnos",
    descripcion:
      "Desde esta mañana el sistema de turnos muestra \"usuario o contraseña incorrectos\" aunque los datos son correctos. Afecta a las 3 PCs de admisión.",
    solicitante: "María Gómez",
    area: "Hospital Central",
    estado: "Abierto",
    prioridad: "Alta",
    fecha: "02/09/2026",
    avatar: "https://i.pravatar.cc/150?img=47",
    tecnico: null,
  },
  {
    id: "2",
    numero: "#1041",
    titulo: "La impresora de recetas no responde",
    descripcion:
      "La impresora de recetas del consultorio 4 no imprime. La cola de impresión queda en \"pendiente\" y no muestra errores.",
    solicitante: "Carlos Ibáñez",
    area: "Centro de Salud N°3",
    estado: "En proceso",
    prioridad: "Media",
    fecha: "01/09/2026",
    avatar: "https://i.pravatar.cc/150?img=12",
    tecnico: null,
  },
  {
    id: "3",
    numero: "#1039",
    titulo: "Solicitud de reseteo de contraseña",
    descripcion:
      "La usuaria olvidó su contraseña del correo institucional y necesita restablecerla para ingresar al portal de RR.HH.",
    solicitante: "Lucía Fernández",
    area: "Administración Central",
    estado: "Resuelto",
    prioridad: "Baja",
    fecha: "31/08/2026",
    avatar: "https://i.pravatar.cc/150?img=32",
    tecnico: null,
  },
  {
    id: "4",
    numero: "#1038",
    titulo: "Error al cargar historia clínica digital",
    descripcion:
      "Al abrir la historia clínica de algunos pacientes aparece \"Error 500\" y la pantalla queda en blanco. Ocurre en todos los equipos del área.",
    solicitante: "Diego Romero",
    area: "Hospital Pediátrico",
    estado: "Abierto",
    prioridad: "Alta",
    fecha: "31/08/2026",
    avatar: "https://i.pravatar.cc/150?img=8",
    tecnico: null,
  },
  {
    id: "5",
    numero: "#1035",
    titulo: "Instalación de antivirus en equipo nuevo",
    descripcion:
      "Llegó un equipo nuevo para enfermería y hay que instalarle el antivirus corporativo antes de conectarlo a la red.",
    solicitante: "Sofía Paz",
    area: "Centro de Salud N°7",
    estado: "En proceso",
    prioridad: "Media",
    fecha: "29/08/2026",
    avatar: "https://i.pravatar.cc/150?img=25",
    tecnico: null,
  },
  {
    id: "6",
    numero: "#1030",
    titulo: "Configuración de VPN para trabajo remoto",
    descripcion:
      "Necesita acceso por VPN para trabajar desde su casa los días viernes. Ya tiene la autorización de su jefe.",
    solicitante: "Martín Silva",
    area: "Dirección de Sistemas",
    estado: "Resuelto",
    prioridad: "Baja",
    fecha: "27/08/2026",
    avatar: "https://i.pravatar.cc/150?img=15",
    tecnico: null,
  },
];
