// ============================================================================
// COMPONENTE DE SECCIÓN: ExpensesList
//
// Renderiza la lista completa del historial de gastos agrupada por día.
// Para cada grupo, muestra un encabezado con la fecha formateada y un separador,
// luego itera sobre las transacciones del grupo renderizando un ExpenseRow.
// ============================================================================

// ----------------------------------------------------------------------------
// DEPENDENCIAS EXTERNAS
// ----------------------------------------------------------------------------
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------------
// COMPONENTES ATÓMICOS
// ----------------------------------------------------------------------------
import AppStack from "@/components/atoms/structure/AppStack";
import AppDivider from "@/components/atoms/structure/AppDivider";
import AppText from "@/components/atoms/content/AppText";
import { SPACING } from "@/constants/metrics";

// ----------------------------------------------------------------------------
// COMPONENTES MOLECULARES (globales)
// ----------------------------------------------------------------------------
import { ExpenseRow } from "@/components/molecules/lists/ExpenseRow";

// ----------------------------------------------------------------------------
// TIPOS LOCALES
// ----------------------------------------------------------------------------
import { ExpensesListProps } from "./index.props";

// ----------------------------------------------------------------------------
// UTILIDAD DE FORMATEO DE FECHA (localizada)
// ----------------------------------------------------------------------------
const formatDateHeader = (dateString: string, locale: string): string => {
  const date = new Date(dateString);
  // Usar el idioma actual para formatear: "lunes, 15 de abril de 2025"
  return date.toLocaleDateString(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL (MEMOIZADO PARA EVITAR RE-RENDERS INNECESARIOS)
// ----------------------------------------------------------------------------
export const ExpensesList: React.FC<ExpensesListProps> = React.memo(
  ({ groupedExpenses, currency, onDeletePress }) => {
    const { i18n } = useTranslation();
    const currentLocale = i18n.language; // 'es' o 'en'

    // Si no hay grupos, no renderizar nada (EmptyState se encarga de mostrar el vacío)
    if (!groupedExpenses.length) {
      return null;
    }

    return (
      <AppStack gap="l">
        {groupedExpenses.map((group, groupIndex) => (
          <AppStack key={group.date} gap="s">
            {/* ----------------------------------------------------------------
            ENCABEZADO DEL DÍA
          ---------------------------------------------------------------- */}
            <AppText
              variant="h3"
              color="accent"
              style={{ marginBottom: SPACING.xs }}
            >
              {formatDateHeader(group.date, currentLocale)}
            </AppText>

            {/* Lista de gastos del día */}
            <AppStack gap="s">
              {group.items.map((transaction) => (
                <ExpenseRow
                  key={transaction.id}
                  transaction={transaction}
                  currency={currency}
                  onDelete={onDeletePress}
                />
              ))}
            </AppStack>

            {/* Separador después de cada grupo excepto el último */}
            {groupIndex < groupedExpenses.length - 1 && (
              <AppDivider color="darkBorder" thickness={1} marginVertical="s" />
            )}
          </AppStack>
        ))}
      </AppStack>
    );
  },
);

ExpensesList.displayName = "ExpensesList";
