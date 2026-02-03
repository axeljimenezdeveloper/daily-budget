import React from "react";
import { View } from "react-native";
import { AppFormFieldProps } from "./index.props";
import { styles } from "./index.styles";
import { getLabelColor, formatErrorText, formatHelperText } from "./index.utils";

import AppText from "@/components/atoms/content/AppText";
import AppStack from "@/components/atoms/structure/AppStack";
import AppIcon from "@/components/atoms/content/AppIcon";

export default function AppFormField({
  children,
  label,
  error,
  helperText,
  required = false,
  disabled = false,
  containerStyle,
}: AppFormFieldProps) {
  
  const labelColor = getLabelColor(error, disabled);

  return (
    <AppStack 
      direction="vertical" 
      gap="xs" 
      style={[styles.container, containerStyle]}
    >
      {/* Fila del Label */}
      {label && (
        <AppStack direction="horizontal" align="center" gap="xs">
          <AppText
            variant="label"
            color={labelColor as any}
            style={{ fontWeight: "600" }}
          >
            {label}
          </AppText>
          
          {required && !disabled && (
            <AppText color="error" style={{ fontSize: 16, lineHeight: 20 }}>*</AppText>
          )}
          
          {disabled && (
            <AppIcon name="lock-closed-outline" library="Ionicons" size="xs" color="secondary" />
          )}
        </AppStack>
      )}

      {/* Contenedor del Input (Hijo) */}
      <View style={{ width: '100%' }}>
        {children}
      </View>

      {/* Sección de Feedback (Icono + Texto) */}
      {error ? (
        <AppStack direction="horizontal" align="center" gap="xs" style={{ marginTop: 2 }}>
          <AppIcon name="alert-circle-outline" library="Ionicons" size="s" color="error" />
          <AppText variant="caption" color="error">
            {formatErrorText(error)}
          </AppText>
        </AppStack>
      ) : helperText && (
        <AppStack direction="horizontal" align="center" gap="xs" style={{ marginTop: 2 }}>
          <AppIcon name="information-circle-outline" library="Ionicons" size="s" color="secondary" />
          <AppText variant="caption" color="secondary">
            {formatHelperText(helperText)}
          </AppText>
        </AppStack>
      )}
    </AppStack>
  );
}