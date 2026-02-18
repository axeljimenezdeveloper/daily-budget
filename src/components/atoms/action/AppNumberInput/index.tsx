// src/components/atoms/action/AppNumberInput/index.tsx
import React, { useState, useEffect } from "react";
import {
  TextInput,
  View,
  Keyboard,
} from "react-native";
import { PALETTE } from "@/constants/colors";
import { TYPOGRAPHY } from "@/constants/metrics";
import { STATE_COLORS } from "./index.utils";
import {
  formatNumberWithSeparators,
  parseFormattedNumber,
  isValidNumber,
  limitDecimals,
  incrementValue,
  decrementValue,
} from "./index.utils";

// Componentes atómicos
import AppText from "../../content/AppText";
import AppStack from "../../structure/AppStack";
import AppIcon from "../../content/AppIcon";
import AppPressable from "../AppPressable"; 

import { AppNumberInputProps } from "./index.props"; 
import { styles } from "./index.styles";

export default function AppNumberInput({
  value,
  onChange,
  label,
  error,
  status,
  currencySymbol,
  showStepper = false,
  min,
  max,
  step = 1,
  allowDecimals = true,
  decimalPlaces = 2,
  placeholder = "0",
  disabled = false,
  variant = "bodyMd", 
  style,
  onFocus,
  onBlur,
  ...rest
}: AppNumberInputProps) {
  // Estado local para manejar el valor formateado
  const [displayValue, setDisplayValue] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);

  // Obtener las propiedades de tipografía de la variante
  // Usamos 'as any' temporalmente para evitar el error de TypeScript
  const typographyStyle = TYPOGRAPHY[variant as keyof typeof TYPOGRAPHY] || TYPOGRAPHY.bodyLg;

  // Inicializar el valor formateado
  useEffect(() => {
    if (value || value === 0) {
      const stringValue = typeof value === "number" ? value.toString() : value;
      const formatted = formatNumberWithSeparators(stringValue);
      setDisplayValue(formatted);
    } else {
      setDisplayValue("");
    }
  }, [value]);

  // Manejar cambio de texto
  const handleChangeText = (text: string) => {
    // Solo permitir caracteres numéricos y punto decimal si está permitido
    let cleanedText = text.replace(/[^\d.]/g, '');
    
    // Validar formato
    if (!isValidNumber(cleanedText, allowDecimals)) {
      return;
    }
    
    // Limitar a un solo punto decimal
    const dotCount = (cleanedText.match(/\./g) || []).length;
    if (dotCount > 1) {
      cleanedText = cleanedText.substring(0, cleanedText.lastIndexOf('.'));
    }
    
    // Limitar decimales si es necesario
    if (allowDecimals && decimalPlaces > 0) {
      cleanedText = limitDecimals(cleanedText, decimalPlaces);
    }
    
    // Actualizar valor
    onChange(cleanedText);
  };

  // Manejar enfoque
  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
    
    // Cuando se enfoca, mostrar el valor sin formato para edición fácil
    if (value || value === 0) {
      const stringValue = typeof value === "number" ? value.toString() : value;
      setDisplayValue(stringValue);
    }
  };

  // Manejar desenfoque
  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
    Keyboard.dismiss();
    
    // Al perder el foco, volver a formatear el número
    if (value || value === 0) {
      const stringValue = typeof value === "number" ? value.toString() : value;
      const formatted = formatNumberWithSeparators(stringValue);
      setDisplayValue(formatted);
    }
  };

  // Manejar incremento
  const handleIncrement = () => {
    if (disabled) return;
    
    const currentValue = value ? parseFormattedNumber(typeof value === "string" ? value : value.toString()) : 0;
    const newValue = incrementValue(currentValue.toString(), step, max);
    onChange(newValue);
  };

  // Manejar decremento
  const handleDecrement = () => {
    if (disabled) return;
    
    const currentValue = value ? parseFormattedNumber(typeof value === "string" ? value : value.toString()) : 0;
    const newValue = decrementValue(currentValue.toString(), step, min);
    onChange(newValue);
  };

  // Determinar color del borde
  const getBorderColor = () => {
    if (error || status === "error") return STATE_COLORS.error;
    if (isFocused) return PALETTE.sunsetOrange;
    return PALETTE.darkBorder;
  };

  // Estilo dinámico para el input que combina el estilo base y la tipografía
  const dynamicInputStyle = {
    ...styles.input,
    fontSize: typographyStyle.fontSize,
    fontWeight: typographyStyle.fontWeight,
    lineHeight: typographyStyle.lineHeight,
    letterSpacing: typographyStyle.letterSpacing,
  };

  return (
    <AppStack gap="xs" style={styles.container}>
      {/* Etiqueta */}
      {label && (
        <AppText variant="label" color="secondary">
          {label}
        </AppText>
      )}

      {/* Contenedor del input */}
      <View
        style={[
          styles.inputWrapper,
          { borderColor: getBorderColor(), opacity: disabled ? 0.6 : 1 },
          style,
        ]}
      >
        {/* Contenedor del input y símbolo de moneda */}
        <View style={styles.inputContainer}>
          {currencySymbol && (
            <AppText 
              variant="body"
              color="secondary" 
              style={[styles.currencySymbol, { fontSize: typographyStyle.fontSize }]}
            >
              {currencySymbol}
            </AppText>
          )}
          
          <TextInput
            style={dynamicInputStyle}
            value={displayValue}
            onChangeText={handleChangeText}
            placeholder={placeholder}
            placeholderTextColor={PALETTE.lightGray}
            keyboardType="decimal-pad"
            editable={!disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...rest}
          />
        </View>

        {/* Steppers (opcional) - AHORA CON AppPressable */}
        {showStepper && !disabled && (
          <View style={styles.stepperContainer}>
            <AppPressable
              onPress={handleDecrement}
              style={styles.stepperButton}
            >
              <AppIcon name="remove" size="m" color="secondary" />
            </AppPressable>
            
            <View style={styles.stepperDivider} />
            
            <AppPressable
              onPress={handleIncrement}
              style={styles.stepperButton}
            >
              <AppIcon name="add" size="m" color="secondary" />
            </AppPressable>
          </View>
        )}
      </View>

      {/* Mensaje de error */}
      {error && (
        <AppText variant="caption" color="error">
          {error}
        </AppText>
      )}
    </AppStack>
  );
}