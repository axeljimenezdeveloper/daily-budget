import { Animated } from "react-native";

export const shouldCloseOnRelease = (
  gestureState: any,
  contentHeight: number,
  threshold: number = 0.25
): boolean => {
  const dragRatio = gestureState.dy / contentHeight;
  const velocity = gestureState.vy;
  return dragRatio > threshold || velocity > 0.5;
};

export const animateIn = (
  translateY: Animated.Value,
  toValue: number = 0,
  duration: number = 300
): Animated.CompositeAnimation => {
  return Animated.timing(translateY, {
    toValue,
    duration,
    useNativeDriver: true,
  });
};

export const animateOut = (
  translateY: Animated.Value,
  toValue: number,
  duration: number = 250
): Animated.CompositeAnimation => {
  return Animated.timing(translateY, {
    toValue,
    duration,
    useNativeDriver: true,
  });
};