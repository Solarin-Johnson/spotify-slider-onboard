import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FACTOR, ThemedText } from "../ThemedText";

export default function Content({
  title,
  titleComponent,
  description,
}: {
  title?: string;
  titleComponent?: React.ReactNode;
  description?: string;
}) {
  return (
    <View style={styles.container}>
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
    gap: 12,
  },
});
