import React from "react"; // Core React library for component logic
import { STATE_COLORS } from "./index.utils"; // Import of semantic color constants for button status

export interface AppButtonProps {
  children: React.ReactNode; // Content to be rendered inside the button
  onPress: () => void; // Callback function triggered on button press
  variant?: "filled" | "outline"; // Visual style variant selection
  status?: keyof typeof STATE_COLORS; // Semantic status mapping to determine the color scheme
  disabled?: boolean; // Flag to disable interactions and apply disabled styling
}