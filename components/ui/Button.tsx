import React, { ReactNode } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

interface ButtonProps {
  text?: string;
  textComponent?: ReactNode;

  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  activeOpacity?: number;
}

const springConfig = {
  damping: 20,
  stiffness: 100,
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Button = ({
  text,
  textComponent,
  onPress,
  disabled = false,
  style,
  textStyle,
  activeOpacity = 0.7,
}: ButtonProps) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.99, springConfig);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, springConfig);
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[styles.button, disabled && styles.disabled, style, animatedStyle]}
    >
      {textComponent ||
        (text && <Text style={[styles.text, textStyle]}>{text}</Text>)}
    </AnimatedPressable>
  );
};

// FloatingButton component that extends ButtonProps
interface FloatingButtonProps extends ButtonProps {
  bottom?: number;
  right?: number;
  left?: number;
  top?: number;
}

export const FloatingButton = ({
  bottom,
  left = 0,
  right,
  top,
  style,
  ...props
}: FloatingButtonProps) => {
  const { bottom: safeBottom } = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.floating,
        {
          bottom: bottom || safeBottom,
          right: left === undefined ? right : undefined,
          left,
          top,
        },
      ]}
    >
      <Button {...props} style={style} />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    backgroundColor: "#CCCCCC",
    opacity: 0.7,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  floating: {
    position: "absolute",
    width: "100%",
    padding: 18,
  },
});

export default Button;
