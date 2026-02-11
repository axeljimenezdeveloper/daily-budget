// ============================================================================
// SECCIÓN DE SELECCIÓN DE MONEDA - CurrencySection
//
// Componente de UI que muestra la moneda actualmente seleccionada y un campo
// tipo select para abrir el modal con la lista completa de monedas.
// Se utiliza dentro de SetupCurrencyScreen.
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
import AppSelect from "@/components/atoms/action/AppSelect";
import AppBadge from "@/components/atoms/visual/AppBadge";
import AppStack from "@/components/atoms/structure/AppStack";

// ----------------------------------------------------------------------------
// PROPS Y CONSTANTES GLOBALES
// ----------------------------------------------------------------------------
import { CurrencySectionProps } from "./index.props";
import { SPACING } from "@/constants/metrics";

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// ----------------------------------------------------------------------------

/**
 * CurrencySection – Visualización y selector de moneda.
 *
 * @param props - Ver CurrencySectionProps en index.props.ts
 * @returns Sección de formulario con AppSelect y badges informativos.
 */
export const CurrencySection: React.FC<CurrencySectionProps> = ({
  currency,
  onOpenModal,
}) => {
  const { t } = useTranslation();

  // RENDERIZADO
  // --------------------------------------------------------------------------
  return (
    <AppStack style={{ width: "100%", marginBottom: SPACING.xl }} gap="m">
      <AppStack gap="s">
        {/* ----------------------------------------------------------------
          ENCABEZADO DE SECCIÓN
          Título "TU MONEDA" con color de acento.
        ---------------------------------------------------------------- */}
        <AppStack direction="horizontal" align="center" gap="xs">
          <AppText variant="h3" color="accent" style={{ fontSize: 16 }}>
            {t("setup.currency_section.title", "TU MONEDA")}
          </AppText>
        </AppStack>

        {/* ----------------------------------------------------------------
          DESCRIPCIÓN DE LA SECCIÓN
          Texto breve que invita a seleccionar la moneda.
        ---------------------------------------------------------------- */}
        <AppText
          variant="caption"
          color="secondary"
          style={{ marginBottom: SPACING.xs }}
        >
          {t(
            "setup.currency_section.description",
            "¿Con qué moneda manejas tus gastos?"
          )}
        </AppText>

        {/* ----------------------------------------------------------------
          SELECTOR DE MONEDA
          Muestra la bandera, código y símbolo de la moneda seleccionada.
          Al presionar, ejecuta onOpenModal para abrir CurrencyModal.
        ---------------------------------------------------------------- */}
        <AppSelect
          value={`${currency.flag} ${currency.code} (${currency.symbol})`}
          onPress={onOpenModal}
          label={t(
            "setup.currency_section.currency_label",
            "Elige tu moneda"
          )}
        />

        {/* ----------------------------------------------------------------
          BADGES DE LA MONEDA SELECCIONADA
          Muestra el código ISO y el símbolo de la moneda actual.
          Solo se renderiza si currency existe (siempre es así).
        ---------------------------------------------------------------- */}
        {currency && (
          <AppStack
            direction="horizontal"
            gap="xs"
            style={{ marginTop: SPACING.xs }}
          >
            <AppBadge
              label={currency.code}
              status="info"
              variant="subtle"
              style={{ paddingHorizontal: SPACING.xs, paddingVertical: 2 }}
            />
            <AppBadge
              label={currency.symbol}
              status="neutral"
              variant="subtle"
              style={{ paddingHorizontal: SPACING.xs, paddingVertical: 2 }}
            />
          </AppStack>
        )}
      </AppStack>
    </AppStack>
  );
};