import { TextInputProps } from "react-native"; // Standard native input props
import { STATE_COLORS } from "./index.utils"; // State color mapping

export interface AppInputProps extends TextInputProps {
  label?: string; // Optional field label
  error?: string; // Error message to display
  status?: keyof typeof STATE_COLORS; // Semantic status (error, success, etc.)
}