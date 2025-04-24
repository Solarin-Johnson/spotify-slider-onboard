import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Artist } from "@/constants/config";

const radius = 450;
const center = { x: -370, y: 300 };

export default function Slider() {
  return (
    <View style={styles.container}>
      {Artist.map((_, i) => {
        const len = Artist.length;
        const angle = (i / len) * (2 * Math.PI);
        const x = center.x + radius * Math.cos(angle);
        const y = center.y + radius * Math.sin(angle);

        // Calculate the rotation for each view (in degrees)
        const rotation = (i / len) * 360;

        return (
          <View
            key={i}
            style={[
              styles.view,
              {
                left: x - 30,
                top: y - 30,
                transform: [{ rotate: `${rotation}deg` }], // Apply rotation to each view
              },
            ]}
          >
            <SliderCard item={_} />
          </View>
        );
      })}
    </View>
  );
}

const SliderCard = ({ item }: { item: any }) => {
  return (
    <View
      style={{
        width: 280,
        height: 105,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "skyblue",
        borderRadius: 18,
      }}
    >
      <Text style={{ color: "white", fontWeight: "bold" }}>{item.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  view: {
    position: "absolute",
    width: 280,
    height: 105,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "skyblue",
    borderRadius: 18,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});
