import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import Header from "@/components/ui/Header";

export default function Index() {
  return (
    <ThemedView style={styles.container}>
      <Header
        title="Home"
        leftComponent={<ThemedText style={styles.text}>Left</ThemedText>}
        rightComponent={<ThemedText style={styles.text}>Right</ThemedText>}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
