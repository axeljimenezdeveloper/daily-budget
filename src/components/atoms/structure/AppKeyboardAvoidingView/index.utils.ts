import { Platform, Dimensions, StatusBar } from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// Calcular el offset del teclado según la plataforma
export const getDefaultKeyboardOffset = (): number => {
  if (Platform.OS === "ios") {
    // En iOS, considerar la altura de la barra de estado y el notch
    const statusBarHeight = StatusBar.currentHeight || 0;
    return statusBarHeight + 20;
  }
  
  // En Android, un offset menor
  return 10;
};

// Determinar el comportamiento por defecto según la plataforma
export const getDefaultBehavior = (): "height" | "padding" | "position" => {
  return Platform.OS === "ios" ? "padding" : "height";
};

// Calcular la altura máxima para el contenido cuando el teclado está visible
export const getMaxContentHeightWithKeyboard = (
  keyboardHeight: number,
  extraOffset: number = 0
): number => {
  return SCREEN_HEIGHT - keyboardHeight - extraOffset;
};