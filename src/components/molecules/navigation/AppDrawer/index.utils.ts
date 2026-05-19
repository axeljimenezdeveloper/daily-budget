import { ROUTES } from "@/constants/navigation";
import { NavRoute } from "./index.props";

// ----------------------------------------------------------------------------
// RUTAS PRINCIPALES (MAIN)
// ----------------------------------------------------------------------------
export const MAIN_ROUTES: NavRoute[] = [
  { label: "Dashboard", icon: "grid-outline", path: ROUTES.MAIN.INDEX },
  { label: "History", icon: "receipt-outline", path: ROUTES.MAIN.HISTORY },
  { label: "Settings", icon: "settings-outline", path: ROUTES.MAIN.SETTINGS },
];

// ----------------------------------------------------------------------------
// RUTAS DE INFORMACIÓN (INFO)
// ----------------------------------------------------------------------------
export const INFO_ROUTES: NavRoute[] = [
  { label: "Guide", icon: "book-outline", path: ROUTES.INFO.GUIDE },
  { label: "Protocols", icon: "shield-checkmark-outline", path: ROUTES.INFO.PROTOCOLS },
];

// ----------------------------------------------------------------------------
// ESTADO DEL PRESUPUESTO (COLOR SEGÚN PORCENTAJE RESTANTE)
// ----------------------------------------------------------------------------
export const getBudgetStatus = (progress: number) => {
  // progress = remainingBudget / totalBudget (0 a 1)
  if (progress < 0.3) return "error";
  if (progress < 0.7) return "warning";
  return "success";
};

// ----------------------------------------------------------------------------
// CÁLCULO DE PROGRESO DEL PRESUPUESTO
// ----------------------------------------------------------------------------
export const getBudgetProgress = (totalBudget: number, remainingBudget: number) => {
  const spent = totalBudget - remainingBudget;
  const remaining = remainingBudget;
  const percentage = totalBudget > 0 ? remaining / totalBudget : 0;
  return { spent, remaining, percentage };
};