// ============================================================================
// MODAL DE SELECCIÓN DE PERÍODO - PeriodModal
//
// Modal que muestra la lista de opciones de duración predefinidas (semanal,
// quincenal, mensual, personalizado). Permite al usuario seleccionar un período,
// traduce dinámicamente las etiquetas y descripciones según el idioma activo,
// resalta la opción seleccionada y cierra automáticamente al elegir.
// Se utiliza en SetupDurationScreen.
// ============================================================================

// ----------------------------------------------------------------------------
// DEPENDENCIAS EXTERNAS
// ----------------------------------------------------------------------------
import React from "react";
import { TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------------
// COMPONENTES ATÓMICOS REUTILIZABLES
// ----------------------------------------------------------------------------
import AppModal from "@/components/atoms/structure/AppModal";
import AppText from "@/components/atoms/content/AppText";
import AppStack from "@/components/atoms/structure/AppStack";

// ----------------------------------------------------------------------------
// PROPS Y CONSTANTES LOCALES
// ----------------------------------------------------------------------------
import { PeriodModalProps } from "./index.props";
import { PeriodOption, PERIOD_OPTIONS } from "../../../types/index";

// ----------------------------------------------------------------------------
// CONSTANTES GLOBALES DE DISEÑO
// ----------------------------------------------------------------------------
import { PALETTE } from "@/constants/colors";
import { SPACING, BORDER_RADIUS } from "@/constants/metrics";

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// ----------------------------------------------------------------------------

/**
 * PeriodModal – Modal con lista de períodos predefinidos para selección.
 *
 * @param props - Ver PeriodModalProps en index.props.ts
 * @returns Modal que contiene un AppStack con TouchableOpacity por cada opción.
 */
export const PeriodModal: React.FC<PeriodModalProps> = ({
  isOpen,
  onClose,
  selectedPeriod,
  onSelectPeriod,
}) => {
  const { t } = useTranslation();

  // --------------------------------------------------------------------------
  // FUNCIÓN AUXILIAR: getTranslatedOption
  // --------------------------------------------------------------------------
  /**
   * Retorna la versión traducida de la etiqueta y descripción de una opción.
   *
   * @param option - Objeto PeriodOption con valores predefinidos.
   * @returns Objeto con label y description traducidos según el idioma actual.
   *
   * @remarks
   * - Utiliza el campo `value` para determinar la clave de traducción.
   * - Los valores 7, 15, 30 y 0 se mapean a 'weekly', 'biweekly', 'monthly' y 'custom'.
   * - Si no coincide, se usa 'custom' como fallback.
   * - Las claves se buscan en `setup.period_section.options.<key>.*`.
   */
  const getTranslatedOption = (option: PeriodOption) => {
    let key: string;
    switch (option.value) {
      case 7:
        key = "weekly";
        break;
      case 15:
        key = "biweekly";
        break;
      case 30:
        key = "monthly";
        break;
      case 0:
        key = "custom";
        break;
      default:
        key = "custom";
    }

    return {
      label: t(`setup.period_section.options.${key}.label`, option.label),
      description: t(
        `setup.period_section.options.${key}.description`,
        option.description,
      ),
    };
  };

  // RENDERIZADO
  // --------------------------------------------------------------------------
  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      title={t("setup.modals.period.title", "Choose the Duration")}
    >
      <AppStack gap="s">
        {PERIOD_OPTIONS.map((opt) => {
          const translated = getTranslatedOption(opt);

          return (
            /*     ------------------------------------------------------------
              OPCIÓN DE PERÍODO INDIVIDUAL
              - Al presionar: selecciona el período (con etiquetas traducidas)
                y cierra el modal.
              - Estilo condicional: fondo y borde naranja si es la opción activa.
              - La clave única es el valor numérico (único por opción).
            ------------------------------------------------------------  */
            <TouchableOpacity
              key={opt.value}
              onPress={() => {
                onSelectPeriod({
                  ...opt,
                  label: translated.label,
                  description: translated.description,
                });
                onClose();
              }}
              style={{
                padding: SPACING.m,
                backgroundColor:
                  selectedPeriod.value === opt.value
                    ? `${PALETTE.sunsetOrange}15`
                    : "transparent",
                borderRadius: BORDER_RADIUS.m,
                borderWidth: 1,
                borderColor:
                  selectedPeriod.value === opt.value
                    ? PALETTE.sunsetOrange
                    : PALETTE.darkBorder,
              }}
            >
              <AppText>
                {translated.label} - {translated.description}
              </AppText>
            </TouchableOpacity>
          );
        })}
      </AppStack>
    </AppModal>
  );
};
