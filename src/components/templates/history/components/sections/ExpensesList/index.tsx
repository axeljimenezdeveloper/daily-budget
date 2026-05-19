// ============================================================================
// COMPONENTE DE SECCIÓN: ExpensesList
//
// Renderiza la lista de gastos agrupada por día. Soporta dos modos:
// 1. Lista completa (groupedExpenses) con paginación por botón "Cargar más".
// 2. Grupo único (singleGroup) para usar dentro de FlatList (carga infinita).
//
// La corrección de zona horaria evita el desfase de fechas al formatear el
// encabezado del día.
// ============================================================================

// ----------------------------------------------------------------------------
// DEPENDENCIAS EXTERNAS
// ----------------------------------------------------------------------------
import React from "react";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------------
// COMPONENTES ATÓMICOS
// ----------------------------------------------------------------------------
import AppStack from "@/components/atoms/structure/AppStack";
import AppBox from "@/components/atoms/structure/AppBox";
import AppDivider from "@/components/atoms/structure/AppDivider";
import AppText from "@/components/atoms/content/AppText";
import AppSpinner from "@/components/atoms/visual/AppSpinner";
import AppButton from "@/components/atoms/action/AppButton";
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
// UTILIDAD DE FORMATEO DE FECHA (CORREGIDA – ZONA HORARIA)
// ----------------------------------------------------------------------------
const formatDateHeader = (dateKey: string, locale: string): string => {
  // dateKey tiene formato "YYYY-MM-DD" (parte UTC de la fecha ISO)
  const [year, month, day] = dateKey.split("-").map(Number);
  // Construir fecha en zona horaria LOCAL (sin desplazamiento UTC)
  const localDate = new Date(year, month - 1, day);
  return localDate.toLocaleDateString(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL (MEMOIZADO)
// ----------------------------------------------------------------------------
export const ExpensesList: React.FC<ExpensesListProps> = React.memo(
  ({
    groupedExpenses = [],
    singleGroup,
    currency,
    onDeletePress,
    onDetailPress,
    onLoadMore,
    isLoadingMore = false,
    hasMore = false,
  }) => {
    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;

    // --------------------------------------------------------------------------
    // MODO GRUPO ÚNICO (para FlatList)
    // --------------------------------------------------------------------------
    if (singleGroup) {
      return (
        <AppStack gap="s">
          <AppText
            variant="h3"
            color="accent"
            style={{ marginBottom: SPACING.xs }}
          >
            {formatDateHeader(singleGroup.date, currentLocale)}
          </AppText>
          <AppStack gap="s">
            {singleGroup.items.map((transaction) => (
              <ExpenseRow
                key={transaction.id}
                transaction={transaction}
                currency={currency}
                onDelete={onDeletePress}
                onDetailPress={onDetailPress}
              />
            ))}
          </AppStack>
        </AppStack>
      );
    }

    // --------------------------------------------------------------------------
    // MODO LISTA COMPLETA (con paginación por botón)
    // --------------------------------------------------------------------------
    if (!groupedExpenses.length) {
      return null;
    }

    return (
      <AppStack gap="l">
        {groupedExpenses.map((group, groupIndex) => (
          <AppStack key={group.date} gap="s">
            {/* ENCABEZADO DEL DÍA */}
            <AppText
              variant="h3"
              color="accent"
              style={{ marginBottom: SPACING.xs }}
            >
              {formatDateHeader(group.date, currentLocale)}
            </AppText>

            {/* LISTA DE GASTOS DEL DÍA */}
            <AppStack gap="s">
              {group.items.map((transaction) => (
                <ExpenseRow
                  key={transaction.id}
                  transaction={transaction}
                  currency={currency}
                  onDelete={onDeletePress}
                  onDetailPress={onDetailPress}
                />
              ))}
            </AppStack>

            {/* SEPARADOR ENTRE GRUPOS */}
            {groupIndex < groupedExpenses.length - 1 && (
              <AppDivider color="darkBorder" thickness={1} marginVertical="s" />
            )}
          </AppStack>
        ))}

        {/* FOOTER DE PAGINACIÓN */}
        {onLoadMore && (
          <AppBox marginTop="l" align="center">
            {isLoadingMore ? (
              <AppSpinner size="l" color="accent" />
            ) : hasMore ? (
              <AppButton
                variant="outline"
                status="accent"
                onPress={onLoadMore}
                fullWidth
              >
                {t("history.loadMore")}
              </AppButton>
            ) : (
              <AppText variant="caption" color="secondary" align="center">
                {t("history.noMore")}
              </AppText>
            )}
          </AppBox>
        )}
      </AppStack>
    );
  }
);

ExpensesList.displayName = "ExpensesList";