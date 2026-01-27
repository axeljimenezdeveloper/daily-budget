import React from "react";
import { View } from "react-native";
import { PALETTE } from "@/constants/colors";
import AppProgressDots from "@/components/atoms/visual/AppProgressDots";
import AppText from "@/components/atoms/content/AppText";
import { AppStepIndicatorProps } from "./index.props";
import { styles } from "./index.styles";
import { validateStepValues, generateLabelText, getLayoutDirection } from "./index.utils";

export default function AppStepIndicator({
  current,
  total,
  variant = "combined",
  showLabel = true,
  labelPosition = "below",
  dotSize = "m",
  dotSpacing = "m",
  activeColor = PALETTE.sunsetOrange,
  inactiveColor = PALETTE.slateGray,
  inactiveOpacity = 0.5,
  labelVariant = "caption",
  labelColor = "secondary",
  labelFormat,
  style,
}: AppStepIndicatorProps) {
  
  // Validar valores
  const { current: safeCurrent, total: safeTotal } = validateStepValues(current, total);
  
  // Generar texto de la etiqueta
  const labelText = generateLabelText(safeCurrent, safeTotal, labelFormat);
  
  // Determinar dirección del layout
  const isHorizontal = getLayoutDirection(variant, labelPosition) === "row";
  
  // Renderizar solo puntos
  if (variant === "dots") {
    return (
      <View style={[styles.container, style]}>
        <AppProgressDots
          total={safeTotal}
          current={safeCurrent}
          size={dotSize}
          spacing={dotSpacing}
          activeColor={activeColor}
          inactiveColor={inactiveColor}
          inactiveOpacity={inactiveOpacity}
        />
      </View>
    );
  }
  
  // Renderizar solo texto
  if (variant === "text") {
    return (
      <View style={[styles.container, styles.textOnly, style]}>
        <AppText variant={labelVariant} color={labelColor}>
          {labelText}
        </AppText>
      </View>
    );
  }
  
  // Renderizar variante minimal (ej: "1/3")
  if (variant === "minimal") {
    return (
      <View style={[styles.container, styles.minimalContainer, style]}>
        <AppText variant={labelVariant} color="primary" style={{ fontWeight: "700" }}>
          {safeCurrent + 1}
        </AppText>
        <AppText variant={labelVariant} color={labelColor}>
          /
        </AppText>
        <AppText variant={labelVariant} color={labelColor}>
          {safeTotal}
        </AppText>
      </View>
    );
  }
  
  // Renderizar variante combinada (default)
  const showDots = variant === "combined";
  const showText = showLabel && variant === "combined";
  
  if (!showText) {
    return (
      <View style={[styles.container, style]}>
        <AppProgressDots
          total={safeTotal}
          current={safeCurrent}
          size={dotSize}
          spacing={dotSpacing}
          activeColor={activeColor}
          inactiveColor={inactiveColor}
          inactiveOpacity={inactiveOpacity}
        />
      </View>
    );
  }
  
  // Renderizar combinación de puntos y texto
  const renderLabel = () => (
    <AppText variant={labelVariant} color={labelColor}>
      {labelText}
    </AppText>
  );
  
  const renderDots = () => (
    <AppProgressDots
      total={safeTotal}
      current={safeCurrent}
      size={dotSize}
      spacing={dotSpacing}
      activeColor={activeColor}
      inactiveColor={inactiveColor}
      inactiveOpacity={inactiveOpacity}
    />
  );
  
  if (isHorizontal) {
    return (
      <View style={[styles.container, styles.combinedHorizontal, style]}>
        {labelPosition === "left" && renderLabel()}
        {renderDots()}
        {labelPosition === "right" && renderLabel()}
      </View>
    );
  }
  
  return (
    <View style={[styles.container, styles.combinedVertical, style]}>
      {labelPosition === "above" && renderLabel()}
      {renderDots()}
      {labelPosition === "below" && renderLabel()}
    </View>
  );
}