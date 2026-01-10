import { ReactNode } from "react"; // Type for component children
import { ViewStyle } from "react-native"; // Native style types for containers

export interface AppContainerProps {
  children: ReactNode; // Elements to be rendered inside the container
  safe?: boolean; // If true, uses the modern SafeAreaView from context library
  flat?: boolean; // If true, removes horizontal padding for edge-to-edge content
  style?: ViewStyle; // Optional extra styles for custom layout needs
}