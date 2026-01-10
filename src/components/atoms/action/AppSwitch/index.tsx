import React from "react"; // React core for component logic
import { Switch, View } from "react-native"; // Native switch and container components
import { SWITCH_COLORS } from "./index.styles"; // Local style constants
import { AppSwitchProps } from "./index.props"; // Property interfaces

export default function AppSwitch({
  value,
  onValueChange,
  disabled = false,
  style,
}: AppSwitchProps) {
  return (
    <View style={style}>
      <Switch
        value={value} // Current controlled value
        onValueChange={onValueChange} // Triggered on user interaction
        disabled={disabled} // Disables the toggle if needed
        trackColor={{
          false: SWITCH_COLORS.inactiveTrack, // Background for OFF state
          true: SWITCH_COLORS.activeTrack, // Background for ON state
        }}
        thumbColor={disabled ? SWITCH_COLORS.disabledThumb : SWITCH_COLORS.thumb} // Dynamic handle color
        ios_backgroundColor={SWITCH_COLORS.inactiveTrack} // Consistent background for iOS devices
      />
    </View>
  );
}