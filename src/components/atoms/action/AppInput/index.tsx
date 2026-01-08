import React, { useState } from "react"; // Core React library for state management
import { TextInput, View } from "react-native"; // Native components for text input and layout
import { PALETTE } from "@/constants/colors"; // Global color palette
import { STATE_COLORS } from "./index.utils"; // Semantic state color mapping
import AppText from "../../content/AppText"; // Using your existing typography atom
import AppStack from "../../structure/AppStack"; // Using your stack atom for structural layout
import { AppInputProps } from "./index.props"; // Component properties interface
import { styles } from "./index.styles"; // Static styles for the input container

export default function AppInput({
  label,
  error,
  status,
  style,
  onFocus,
  onBlur,
  ...rest
}: AppInputProps) {
  // Local state to track focus for visual feedback
  const [isFocused, setIsFocused] = useState(false);

  // Logic to determine border color based on focus, status, or validation error
  const getBorderColor = () => {
    if (error || status === "error") return STATE_COLORS.error; // Returns red for error states
    if (isFocused) return PALETTE.sunsetOrange; // Highlight border with accent color on focus
    return PALETTE.darkBorder; // Default subtle border color
  };

  return (
    <AppStack gap="xs" style={styles.container}>
      {/* Label rendered using the AppText atom for typographic consistency */}
      {label && (
        <AppText variant="label" color="secondary">
          {label}
        </AppText>
      )}

      {/* Input container that manages dynamic border colors */}
      <View style={[styles.inputWrapper, { borderColor: getBorderColor() }, style]}>
        <TextInput
          style={styles.input}
          placeholderTextColor={PALETTE.lightGray} // Subtle color for placeholder text
          onFocus={(e) => {
            setIsFocused(true); // Triggers focus state
            onFocus?.(e); // Propagates native focus event
          }}
          onBlur={(e) => {
            setIsFocused(false); // Clears focus state
            onBlur?.(e); // Propagates native blur event
          }}
          {...rest} // Spreads remaining TextInputProps (keyboardType, maxLength, etc.)
        />
      </View>

      {/* Error message displayed only if the error prop is provided */}
      {error && (
        <AppText variant="caption" color="error">
          {error}
        </AppText>
      )}
    </AppStack>
  );
}