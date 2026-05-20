// ============================================================================
// COMPONENTE MOLECULAR: ACCORDION ITEM (SIN BORDES LATERALES)
// ============================================================================

import React, { useRef, useEffect } from 'react';
import { View, Animated } from 'react-native';

import AppPressable from '@/components/atoms/action/AppPressable';
import AppIcon from '@/components/atoms/content/AppIcon';
import AppText from '@/components/atoms/content/AppText';

import { styles } from './index.styles';
import { AccordionItemProps } from './index.props';

export const AccordionItem: React.FC<AccordionItemProps> = ({
  iconName,
  question,
  answer,
  isOpen,
  onPress,
  isLast = false,
}) => {
  // Animación de rotación para el chevron
  const spinValue = useRef(new Animated.Value(isOpen ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(spinValue, {
      toValue: isOpen ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [isOpen, spinValue]);

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={[styles.card, isLast && { marginBottom: 0 }]}>
      <AppPressable onPress={onPress} hapticFeedback="light">
        <View style={styles.pressableContent}>
          <View style={styles.row}>
            <View style={styles.leftContainer}>
              <View style={styles.iconCircle}>
                <AppIcon name={iconName} size="m" color="accent" />
              </View>
              <AppText variant="body" color="primary" style={styles.questionText}>
                {question}
              </AppText>
            </View>
            <Animated.View style={[styles.chevronContainer, { transform: [{ rotate }] }]}>
              <AppIcon name="chevron-down-outline" size="m" color="accent" />
            </Animated.View>
          </View>
        </View>
      </AppPressable>

      {isOpen && (
        <View style={styles.answerWrapper}>
          <AppText variant="caption" color="secondary" style={styles.answerText}>
            {answer}
          </AppText>
        </View>
      )}
    </View>
  );
};