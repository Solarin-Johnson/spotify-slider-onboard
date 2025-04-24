import { StyleSheet, View } from "react-native";
import React from "react";
import { FACTOR, ThemedText } from "../ThemedText";
import { LinearGradient } from "expo-linear-gradient";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function Content({
  title,
  titleComponent,
  description,
}: {
  title?: string;
  titleComponent?: React.ReactNode;
  description?: string;
}) {
  const bg = useThemeColor({}, "background");

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[bg, bg, bg + "60", "transparent"]}
        locations={[0, 0.6, 0.9, 1]}
        style={styles.background}
      />
      {titleComponent ||
        (title && <ThemedText type="title">{title}</ThemedText>)}
      {description && (
        <ThemedText
          style={{
            opacity: 0.8,
            lineHeight: 16.5 + FACTOR,
            fontSize: 9.5 + FACTOR,
          }}
        >
          {description}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    padding: 18,
    paddingVertical: 16,
    paddingBottom: 42,
    gap: 12,
    zIndex: 10,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
