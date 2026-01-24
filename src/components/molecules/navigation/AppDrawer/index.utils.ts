import { NavRoute } from "./index.props";

export const MAIN_ROUTES: NavRoute[] = [
  { label: "Panel de Control", icon: "grid-outline", path: "/" },
  { label: "Historial de Gastos", icon: "receipt-outline", path: "/history" },
  { label: "Ajustes del Sistema", icon: "settings-outline", path: "/settings" },
];

export const INFO_ROUTES: NavRoute[] = [
  { label: "Guía de Supervivencia", icon: "book-outline", path: "/info/guide" },
  { label: "Protocolos", icon: "shield-checkmark-outline", path: "/info/protocols" },
];

export const getOxygenStatus = (progress: number) => {
  if (progress < 0.2) return "error";
  if (progress < 0.5) return "warning";
  return "success";
};