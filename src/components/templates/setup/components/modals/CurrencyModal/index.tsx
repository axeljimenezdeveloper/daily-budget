// ============================================================================
// MODAL DE SELECCIÓN DE MONEDA - CurrencyModal
//
// Modal que muestra la lista completa de monedas disponibles (CURRENCY_LIST).
// Permite al usuario seleccionar una moneda, resalta la opción activa y
// cierra automáticamente al seleccionar. Se utiliza en SetupCurrencyScreen.
// ============================================================================

// ----------------------------------------------------------------------------
// DEPENDENCIAS EXTERNAS
// ----------------------------------------------------------------------------
import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------------
// COMPONENTES ATÓMICOS REUTILIZABLES
// ----------------------------------------------------------------------------
import AppModal from "@/components/atoms/structure/AppModal";
import AppText from "@/components/atoms/content/AppText";
import AppStack from "@/components/atoms/structure/AppStack";

// ----------------------------------------------------------------------------
// CONSTANTES Y PROPS
// ----------------------------------------------------------------------------
import { CURRENCY_LIST } from "../../../constants/currencies";
import { CurrencyModalProps } from "./index.props";

// ----------------------------------------------------------------------------
// CONSTANTES GLOBALES DE DISEÑO
// ----------------------------------------------------------------------------
import { PALETTE } from "@/constants/colors";
import { SPACING, BORDER_RADIUS } from "@/constants/metrics";

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// ----------------------------------------------------------------------------

/**
 * CurrencyModal – Modal con lista de monedas para selección.
 *
 * @param props - Ver CurrencyModalProps en index.props.ts
 * @returns Modal que contiene un ScrollView con TouchableOpacity por cada moneda.
 */
export const CurrencyModal: React.FC<CurrencyModalProps> = ({
  isOpen,
  onClose,
  selectedCurrency,
  onSelectCurrency,
}) => {
  const { t } = useTranslation();

  // RENDERIZADO
  // --------------------------------------------------------------------------
  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      title={t("setup.modals.currency.title", "Choose Your Currency")}
    >
      {/* ----------------------------------------------------------------
        CONTENEDOR DESPLAZABLE CON LA LISTA DE MONEDAS
        Altura máxima fija (400) para evitar que el modal sea demasiado grande.
      ---------------------------------------------------------------- */}
      <ScrollView style={{ maxHeight: 400 }}>
        <AppStack gap="s">
          {CURRENCY_LIST.map((item) => (
           /*   ------------------------------------------------------------
              OPCIÓN DE MONEDA INDIVIDUAL
              - Al presionar: selecciona la moneda y cierra el modal.
              - Estilo condicional: fondo y borde naranja si es la moneda activa.
            ------------------------------------------------------------  */
            <TouchableOpacity
              key={item.code}
              onPress={() => {
                onSelectCurrency(item);
                onClose();
              }}
              style={{
                padding: SPACING.m,
                backgroundColor:
                  selectedCurrency.code === item.code
                    ? `${PALETTE.sunsetOrange}15`
                    : "transparent",
                borderRadius: BORDER_RADIUS.m,
                borderWidth: 1,
                borderColor:
                  selectedCurrency.code === item.code
                    ? PALETTE.sunsetOrange
                    : PALETTE.darkBorder,
              }}
            >
              <AppText>
                {item.flag} {item.name} ({item.symbol})
              </AppText>
            </TouchableOpacity>
          ))}
        </AppStack>
      </ScrollView>
    </AppModal>
  );
};