import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

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
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {leftComponent ? (
          <TouchableOpacity onPress={onLeftPress}>
            {leftComponent}
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
          <TouchableOpacity onPress={onRightPress}>
            {rightComponent}
          </TouchableOpacity>
        ) : (
          <View style={styles.buttonPlaceholder} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  leftContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  centerContainer: {
    flex: 3,
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
