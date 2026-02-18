// ============================================================================
// ESTILOS Y CONSTANTES PARA AppSwitch
// ============================================================================

import { PALETTE } from "@/constants/colors";
import { StyleSheet } from "react-native";

// Colores semánticos para los estados del switch
export const SWITCH_COLORS = {
  activeTrack: PALETTE.sunsetOrange,   // Track cuando está activo (ON)
  inactiveTrack: PALETTE.slateGray,    // Track cuando está inactivo (OFF)
  thumb: PALETTE.creamWhite,            // Color del círculo deslizante
  disabledThumb: PALETTE.lightGray,     // Color del círculo en estado deshabilitado
};

// Dimensiones ajustadas para asemejarse al tamaño del Switch nativo
export const SWITCH_SIZES = {
  trackWidth: 38,        // Ancho total del track (antes 50)
  trackHeight: 16,       // Alto del track (antes 30)
  thumbSize: 20,         // Diámetro del círculo deslizante (antes 26)
  thumbMargin: 0,        // Margen interior del thumb respecto al track (igual)
};

export const styles = StyleSheet.create({
  track: {
    width: SWITCH_SIZES.trackWidth,
    height: SWITCH_SIZES.trackHeight,
    borderRadius: SWITCH_SIZES.trackHeight / 2, // Forma de píldora
    justifyContent: 'center',
  },
  thumb: {
    width: SWITCH_SIZES.thumbSize,
    height: SWITCH_SIZES.thumbSize,
    borderRadius: SWITCH_SIZES.thumbSize / 2,
    position: 'absolute',
    left: SWITCH_SIZES.thumbMargin, // Posición inicial fija; el movimiento se hace con transform
  },
});