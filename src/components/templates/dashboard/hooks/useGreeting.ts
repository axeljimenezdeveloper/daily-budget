// ============================================================================
// HOOK PERSONALIZADO: useGreeting
//
// Genera el mensaje de saludo dinámico para la cabecera del dashboard.
// El mensaje varía según la hora del día (mañana, tarde, noche) y el estado
// de la bóveda (modo cuidado activo o no).
//
// Utiliza las claves de traducción definidas en dashboard.greeting:
//   - morning_calm / morning_extreme
//   - afternoon_calm / afternoon_extreme
//   - evening_calm / evening_extreme
// ============================================================================

import { useTranslation } from 'react-i18next';

type Period = 'morning' | 'afternoon' | 'evening';

export const useGreeting = (isExtremeMode: boolean): string => {
  const { t } = useTranslation();

  // Determinar el período del día basado en la hora actual
  const hour = new Date().getHours();
  let period: Period;

  if (hour >= 5 && hour < 12) {
    period = 'morning';
  } else if (hour >= 12 && hour < 20) {
    period = 'afternoon';
  } else {
    period = 'evening'; // 20:00 - 4:59
  }

  const translationKey = isExtremeMode
    ? `dashboard.greeting.${period}_extreme`
    : `dashboard.greeting.${period}_calm`;

  return t(translationKey);
};