import React from "react"; // Core React library for logic
import { View } from "react-native"; // Fundamental layout component
import { SPACING } from "@/constants/metrics"; // Access to the 4px base spacing system
import { AppSpacerProps } from "./index.props"; // Properties interface

export default function AppSpacer({ 
  size = "m", // Default spacing is 16px (m)
  horizontal = false, // Defaults to vertical layout
  flex, // Enables flexible spacing
}: AppSpacerProps) {
  
  // Gets the numeric value from the spacing object
  const spaceValue = SPACING[size]; 

  const spacerStyle = {
    width: horizontal ? spaceValue : undefined, // Applies horizontal gap
    height: !horizontal ? spaceValue : undefined, // Applies vertical gap
    flex: flex, // Applies flex if provided
  };

  return <View style={spacerStyle} />;
}