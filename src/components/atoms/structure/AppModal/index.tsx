// ============================================================================
// MODAL BASE REUTILIZABLE - AppModal
//
// Componente modal configurable que soporta:
// - Apertura/cierre con animación
// - Cierre deslizando (swipe to close) restringido al header y drag indicator
// - Overlay con opacidad configurable
// - Header opcional con título y botón de cierre
// - Contenido personalizable (acepta ScrollView u otros componentes)
// ============================================================================

import React, { useEffect, useRef } from "react";
import {
  Animated,
  PanResponder,
  View,
  Dimensions,
  DimensionValue,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppModalProps } from "./index.props";
import { styles } from "./index.styles";
import { shouldCloseOnRelease, animateIn, animateOut } from "./index.utils";

// Componentes atómicos
import AppOverlay from "../AppOverlay";
import AppText from "../../content/AppText";
import AppIcon from "../../content/AppIcon";
import AppPressable from "../../action/AppPressable"; // 👈 Ahora usamos AppPressable

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function AppModal({
  children,
  isOpen,
  onClose,
  title = "",
  showHeader = true,
  height = "auto",
  swipeToClose = true,
  backdropOpacity = 0.7,
  showCloseButton = true,
  closeOnBackdropPress = true,
  style,
  contentStyle,
}: AppModalProps) {
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const contentHeightRef = useRef(0);
  const [internalHeight, setInternalHeight] = React.useState<DimensionValue>(height);

  // Referencias para medir áreas de gestos
  const headerLayoutRef = useRef<{ y: number; height: number } | null>(null);
  const dragLayoutRef = useRef<{ y: number; height: number } | null>(null);

  // Rastrear origen del gesto
  const gestureStartedInAllowedArea = useRef(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt) => {
        if (!swipeToClose) return false;

        const touchY = evt.nativeEvent.locationY;
        let inAllowedArea = false;

        if (dragLayoutRef.current) {
          const { y, height } = dragLayoutRef.current;
          if (touchY >= y && touchY <= y + height) inAllowedArea = true;
        }

        if (!inAllowedArea && showHeader && headerLayoutRef.current) {
          const { y, height } = headerLayoutRef.current;
          if (touchY >= y && touchY <= y + height) inAllowedArea = true;
        }

        gestureStartedInAllowedArea.current = inAllowedArea;
        return inAllowedArea;
      },

      onMoveShouldSetPanResponder: (_, gestureState) => {
        return (
          gestureStartedInAllowedArea.current &&
          Math.abs(gestureState.dy) > Math.abs(gestureState.dx * 2)
        );
      },

      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },

      onPanResponderRelease: (_, gestureState) => {
        if (shouldCloseOnRelease(gestureState, contentHeightRef.current)) {
          handleClose();
        } else {
          animateIn(translateY, 0).start();
        }
        gestureStartedInAllowedArea.current = false;
      },

      onPanResponderTerminate: () => {
        gestureStartedInAllowedArea.current = false;
      },
    })
  ).current;

  useEffect(() => {
    if (isOpen) {
      animateIn(translateY, 0).start();
    } else {
      animateOut(translateY, contentHeightRef.current || SCREEN_HEIGHT).start();
    }
  }, [isOpen]);

  const handleClose = () => {
    animateOut(translateY, contentHeightRef.current || SCREEN_HEIGHT).start(() => {
      onClose();
    });
  };

  const handleContentLayout = (event: any) => {
    const { height: measuredHeight } = event.nativeEvent.layout;

    if (measuredHeight === contentHeightRef.current) return;
    contentHeightRef.current = measuredHeight;

    if (height === "auto") {
      setInternalHeight(measuredHeight);
      if (!isOpen) translateY.setValue(measuredHeight);
    }
  };

  return (
    <AppOverlay
      isOpen={isOpen}
      onClose={closeOnBackdropPress ? handleClose : undefined}
      backgroundColor={`rgba(0,0,0,${backdropOpacity})`}
    >
      <View style={styles.container} pointerEvents="box-none">
        <Animated.View
          style={[
            styles.content,
            {
              height: height === "auto" ? internalHeight : height,
              transform: [{ translateY }],
              paddingBottom: Math.max(insets.bottom, 20),
            } as any,
            contentStyle,
          ]}
          onLayout={handleContentLayout}
          {...panResponder.panHandlers}
        >
          {/* Indicador de arrastre */}
          {swipeToClose && (
            <View
              style={styles.dragIndicator}
              onLayout={(e) => {
                dragLayoutRef.current = e.nativeEvent.layout;
              }}
            />
          )}

          {/* Header */}
          {showHeader && (
            <View
              style={styles.header}
              onLayout={(e) => {
                headerLayoutRef.current = e.nativeEvent.layout;
              }}
            >
              <AppText variant="h3" style={{ flex: 1 }}>
                {title}
              </AppText>
              {showCloseButton && (
                <AppPressable onPress={handleClose} style={styles.closeButton}>
                  <AppIcon name="close" size="m" color="primary" />
                </AppPressable>
              )}
            </View>
          )}

          {/* Contenido */}
          <View style={[styles.body, style]}>{children}</View>
        </Animated.View>
      </View>
    </AppOverlay>
  );
}