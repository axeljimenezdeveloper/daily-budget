// ============================================================================
// SECCIÓN DE PRESUPUESTO - BudgetSection
//
// Componente de UI que encapsula el campo de entrada de presupuesto,
// la validación visual y la presentación de la moneda seleccionada.
// Se utiliza dentro de SetupBudgetScreen.
// ============================================================================

// ----------------------------------------------------------------------------
// DEPENDENCIAS EXTERNAS
// ----------------------------------------------------------------------------
import React from "react";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------------
// COMPONENTES ATÓMICOS
// ----------------------------------------------------------------------------
import AppText from "@/components/atoms/content/AppText";
import AppNumberInput from "@/components/atoms/action/AppNumberInput";
import AppBadge from "@/components/atoms/visual/AppBadge";
import AppStack from "@/components/atoms/structure/AppStack";

// ----------------------------------------------------------------------------
// PROPS Y CONSTANTES LOCALES
// ----------------------------------------------------------------------------
import { BudgetSectionProps } from "./index.props";
import { MIN_BUDGET, MAX_BUDGET } from "../../../constants/validation";
import { SPACING } from "@/constants/metrics";

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// ----------------------------------------------------------------------------

/**
 * BudgetSection – Entrada de presupuesto con validación en tiempo real.
 *
 * @param props - Ver BudgetSectionProps en index.props.ts
 * @returns Sección de formulario con AppNumberInput y feedback visual.
 */
export const BudgetSection: React.FC<BudgetSectionProps> = ({
  currency,
  budget,
  error,
  isValid,
  onBudgetChange,
}) => {
  const { t } = useTranslation();

  // --------------------------------------------------------------------------
  // DETERMINA EL ESTADO VISUAL DEL INPUT
  // --------------------------------------------------------------------------
  // Retorna "error" si hay mensaje de error, "success" si es válido y tiene
  // contenido, "neutral" en cualquier otro caso.
  const getInputStatus = () => {
    if (error) return "error";
    if (isValid && budget) return "success";
    return "neutral";
  };

  // RENDERIZADO
  // --------------------------------------------------------------------------
  return (
    <AppStack style={{ width: "100%", marginBottom: SPACING.xl }} gap="m">
      {/* ----------------------------------------------------------------
        ENCABEZADO DE SECCIÓN: Título y badge de moneda
        El título se traduce con clave "setup.budget_section.title".
        El badge muestra el código de moneda (ej. USD, EUR).
      ---------------------------------------------------------------- */}
      <AppStack direction="horizontal" align="center" gap="xs">
        <AppText variant="h3" color="accent" style={{ fontSize: 16 }}>
          {t("setup.budget_section.title", "Tus recursos")}
        </AppText>
        <AppBadge
          label={currency.code}
          status="info"
          variant="subtle"
          style={{ paddingHorizontal: SPACING.xs, paddingVertical: 2 }}
        />
      </AppStack>

      {/* ----------------------------------------------------------------
        DESCRIPCIÓN DE LA SECCIÓN
        Texto explicativo breve sobre el propósito del presupuesto.
      ---------------------------------------------------------------- */}
      <AppText
        variant="caption"
        color="secondary"
        style={{ marginBottom: SPACING.xs }}
      >
        {t(
          "setup.budget_section.description",
          "¿De cuánto dispones y para cuánto tiempo quieres que te alcance?"
        )}
      </AppText>

      {/* ----------------------------------------------------------------
        CAMPO NUMÉRICO DE PRESUPUESTO
        - Muestra el símbolo de moneda como prefijo.
        - Incluye steppers (+/-) para facilitar ajustes.
        - Los límites (min, max) se toman de constants/validation.
        - El estado visual (status) cambia según getInputStatus().
      ---------------------------------------------------------------- */}
      <AppNumberInput
        value={budget}
        onChange={onBudgetChange}
        placeholder={t(
          "setup.budget_section.budget_placeholder",
          "Escribe el monto total"
        )}
        currencySymbol={currency.symbol}
        status={getInputStatus()}
        label={t(
          "setup.budget_section.budget_label",
          "¿Cuál es tu presupuesto?"
        )}
        showStepper={true}
        min={MIN_BUDGET}
        max={MAX_BUDGET}
      />

      {/* ----------------------------------------------------------------
        MENSAJE DE ERROR (si existe)
        Se muestra solo cuando la validación falla.
      ---------------------------------------------------------------- */}
      {error && (
        <AppText
          variant="caption"
          color="error"
          style={{ marginLeft: SPACING.xs }}
        >
          {error}
        </AppText>
      )}
    </AppStack>
  );
};