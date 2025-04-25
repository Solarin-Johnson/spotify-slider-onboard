import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AdaptiveElement from "./AdaptiveElement";
import { useThemeColor } from "@/hooks/useThemeColor";

interface HeaderProps {
  title?: string;
  titleComponent?: React.ReactNode;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  onLeftPress?: () => void;
  onRightPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  titleComponent,
  leftComponent,
  rightComponent,
  onLeftPress,
  onRightPress,
}) => {
  const { top } = useSafeAreaInsets();
  const bg = useThemeColor({}, "background");
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: top + 16,
          backgroundColor: bg,
        },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.leftContainer}>
          {leftComponent ? (
            <TouchableOpacity onPress={onLeftPress} activeOpacity={0.7}>
              <AdaptiveElement>{leftComponent}</AdaptiveElement>
            </TouchableOpacity>
          ) : (
            <View style={styles.buttonPlaceholder} />
          )}
        </View>

        <View style={styles.centerContainer}>
          {title ? (
            <Text style={styles.title}>{title}</Text>
          ) : titleComponent ? (
            titleComponent
          ) : null}
        </View>

        <View style={styles.rightContainer}>
          {rightComponent ? (
            <TouchableOpacity onPress={onRightPress} activeOpacity={0.7}>
              <AdaptiveElement>{rightComponent}</AdaptiveElement>
            </TouchableOpacity>
          ) : (
            <View style={styles.buttonPlaceholder} />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor:  "red",
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  content: {
    // height: 28,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  centerContainer: {
    flex: 2,
    alignItems: "center",
  },
  rightContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  buttonPlaceholder: {
    width: 24,
    height: 24,
  },
});

export default Header;
