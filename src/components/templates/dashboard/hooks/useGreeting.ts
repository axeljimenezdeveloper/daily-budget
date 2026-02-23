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

// ----------------------------------------------------------------------------
// DEPENDENCIAS EXTERNAS
// ----------------------------------------------------------------------------
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------------
// TIPOS LOCALES (opcional, para claridad)
// ----------------------------------------------------------------------------
type Period = 'morning' | 'afternoon' | 'evening';

// ----------------------------------------------------------------------------
// HOOK PRINCIPAL
// ----------------------------------------------------------------------------
export const useGreeting = (isExtremeMode: boolean): string => {
  const { t } = useTranslation();

  // Determinar el período del día basado en la hora actual
  const period = useMemo((): Period => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      return 'morning';
    } else if (hour >= 12 && hour < 20) {
      return 'afternoon';
    } else {
      return 'evening'; // 20:00 - 4:59
    }
  }, []); // Solo se calcula una vez al montar el componente, pero podría actualizarse si se desea dinámico

  // Construir la clave de traducción según período y modo extremo
  const translationKey = useMemo(() => {
    const baseKey = `dashboard.greeting.${period}`;
    return isExtremeMode ? `${baseKey}_extreme` : `${baseKey}_calm`;
  }, [period, isExtremeMode]);

  // Retornar el string traducido
  return t(translationKey);
};