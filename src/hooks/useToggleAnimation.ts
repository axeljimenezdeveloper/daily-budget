// ============================================================================
// HOOK PERSONALIZADO: useToggleAnimation (Versión TS Actualizada)
// ============================================================================
import { useEffect, useRef, useCallback, useState, RefObject } from 'react';
import { Animated, AccessibilityInfo } from 'react-native';
import { ANIMATION } from '@/constants/animations';

type EasingFunction = (value: number) => number;

interface UseToggleAnimationOptions {
  value?: boolean;
  duration?: number;
  easing?: EasingFunction;
  useNativeDriver?: boolean;
  onAnimated?: (value: boolean) => void;
}

interface UseToggleAnimationReturn {
  animatedValue: Animated.Value;
  toggle: (toValue?: boolean) => void;
  // Cambiamos MutableRefObject por RefObject
  isAnimatingRef: RefObject<boolean>;
  currentValueRef: RefObject<boolean>;
}

export const useToggleAnimation = ({
  value = false,
  duration = ANIMATION.DURATION,
  easing = ANIMATION.EASING,
  useNativeDriver = ANIMATION.USE_NATIVE_DRIVER,
  onAnimated,
}: UseToggleAnimationOptions = {}): UseToggleAnimationReturn => {
  
  const animatedValueRef = useRef(new Animated.Value(value ? 1 : 0));

  // En React 19, useRef devuelve un RefObject cuyo .current ya es mutable
  const currentValueRef = useRef<boolean>(value);
  const isAnimatingRef = useRef<boolean>(false);
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
    const listener = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      setReduceMotion
    );
    return () => listener.remove();
  }, []);

  const animateToValue = useCallback(
    (toValue: boolean) => {
      if (toValue === currentValueRef.current && !isAnimatingRef.current) return;

      currentValueRef.current = toValue;
      const targetValue = toValue ? 1 : 0;

      if (reduceMotion) {
        animatedValueRef.current.setValue(targetValue);
        onAnimated?.(toValue);
        return;
      }

      if (animationRef.current) {
        animationRef.current.stop();
      }

      isAnimatingRef.current = true;

      animationRef.current = Animated.timing(animatedValueRef.current, {
        toValue: targetValue,
        duration,
        easing,
        useNativeDriver,
      });

      animationRef.current.start(({ finished }) => {
        if (finished) {
          isAnimatingRef.current = false;
          onAnimated?.(toValue);
        }
        animationRef.current = null;
      });
    },
    [duration, easing, useNativeDriver, reduceMotion, onAnimated]
  );

  const toggle = useCallback(
    (toValue?: boolean) => {
      const target = toValue ?? !currentValueRef.current;
      animateToValue(target);
    },
    [animateToValue]
  );

  useEffect(() => {
    if (value !== currentValueRef.current) {
      animateToValue(value);
    }
  }, [value, animateToValue]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, []);

  return {
    animatedValue: animatedValueRef.current,
    toggle,
    // TypeScript ahora está feliz con estas referencias
    isAnimatingRef,
    currentValueRef,
  };
};