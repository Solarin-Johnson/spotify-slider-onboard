import React, { ReactNode } from "react";
import { Text, StyleSheet, ViewStyle, TextStyle, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useThemeColor } from "@/hooks/useThemeColor";

interface ButtonProps {
  text?: string;
  textComponent?: ReactNode;

  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}
const springConfig = {
  damping: 30,
  stiffness: 70,
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Button = ({
  text,
  textComponent,
  onPress,
  disabled = false,
  style,
  textStyle,
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

interface FloatingButtonProps extends ButtonProps {
  bottom?: number;
  right?: number;
  left?: number;
  top?: number;
}

export const FloatingButton = ({
  bottom = 0,
  left = 0,
  right,
  top,
  style,
  ...props
}: FloatingButtonProps) => {
  const { bottom: safeBottom } = useSafeAreaInsets();
  const bg = useThemeColor({}, "background");

  return (
    <View
      style={[
        styles.floating,
        {
          bottom: bottom,
          right: left === undefined ? right : undefined,
          paddingBottom: safeBottom + 28,
          left,
          top,
          backgroundColor: bg + "80",
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
    paddingVertical: 42,
  },
});

export default Button;
