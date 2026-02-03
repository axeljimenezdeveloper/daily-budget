import { TextInputProps } from "react-native";
import { STATE_COLORS } from "./index.utils";

export interface AppNumberInputProps extends Omit<TextInputProps, 'onChangeText' | 'value' | 'onChange'> {
  value: string | number;
  onChange: (value: string) => void; 
  label?: string;
  error?: string;
  status?: keyof typeof STATE_COLORS;
  currencySymbol?: string;
  showStepper?: boolean;
  min?: number;
  max?: number;
  step?: number;
  allowDecimals?: boolean;
  decimalPlaces?: number;
  placeholder?: string;
  disabled?: boolean;
}