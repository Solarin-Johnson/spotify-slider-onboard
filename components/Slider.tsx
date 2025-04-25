import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Artist } from "@/constants/config";
import { Image } from "expo-image";
import { FACTOR, ThemedText } from "./ThemedText";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const ROTATION_FACTOR = 0.04;
const STOP_ANGLE = 270;
const SPRING_CONFIG = {
  damping: 15,
  stiffness: 120,
  mass: 1,
};

const CARD_WIDTH = 250 + FACTOR * 8;
const CARD_HEIGHT = 90 + FACTOR * 4;
const radius = CARD_WIDTH + FACTOR * 32;
const diameter = radius * 2;
const CONTAINER_WIDTH = diameter;
const center = {
  x: diameter / 2,
  y: diameter / 2,
};

const anglePerCard = 360 / Artist.length;

export default function Slider() {
  const pressed = useSharedValue<boolean>(false);
  const offset = useSharedValue<number>(0);

  const pan = Gesture.Pan()
    .hitSlop(CONTAINER_WIDTH)
    .onBegin(() => {
      pressed.value = true;
    })
    .onChange((event) => {
      const delta = event.velocityY * ROTATION_FACTOR ** 2; // scale to taste
      offset.value = Math.max(
        Math.min(STOP_ANGLE * 0.05, offset.value + delta),
        -STOP_ANGLE * 1.05
      );
    })

    .onFinalize((event) => {
      pressed.value = false;
      const isNeg = event.translationY < 0;
      const rawRotation = offset.value;
      const round = rawRotation / anglePerCard;

      const snappedAngle =
        (isNeg ? Math.floor(round) : Math.ceil(round)) * anglePerCard;

      offset.value = withDecay({
        velocity: event.velocityY * ROTATION_FACTOR,
        deceleration: 0.985,
      });

      offset.value = withSpring(
        rawRotation > 0
          ? 0
          : rawRotation > -STOP_ANGLE
          ? snappedAngle
          : Math.round(-STOP_ANGLE / anglePerCard) * anglePerCard,
        SPRING_CONFIG
      );
    });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${offset.value}deg`,
        },
      ],
    };
  });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.container, animatedStyles, {}]}>
        {Artist.map((_, i) => {
          const len = Artist.length;
          const angle = (i / len) * (2 * Math.PI);
          const x = center.x + radius * Math.cos(angle);
          const y = center.y + radius * Math.sin(angle);

          const rotation = (i / len) * 360;

          if (rotation < 270)
            return (
              <View
                key={i}
                style={[
                  styles.view,
                  {
                    left: x - CARD_WIDTH / 2,
                    top: y - CARD_HEIGHT / 2,
                    transform: [{ rotate: `${rotation}deg` }],
                  },
                ]}
              >
                <SliderCard item={_} />
              </View>
            );
        })}
      </Animated.View>
    </GestureDetector>
  );
}

const SliderCard = ({ item }: { item: Artist }) => {
  const { name, image, bg, color } = item;
  const fontSize =
    CARD_HEIGHT / (2.7 + (name.length > 6 ? (name.length - 10) * 0.05 : 0));

  return (
    <View
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: bg,
        borderRadius: 18,
        padding: 3,
        gap: 4,
        flexDirection: "row",
      }}
    >
      <View style={{ flex: 1, padding: 10, justifyContent: "center" }}>
        <ThemedText
          style={{
            color: color,
            fontSize,
            fontFamily: "InterBold",
            lineHeight: fontSize * 1.05,
            letterSpacing: -1.5,
          }}
          numberOfLines={2}
          //   ellipsizeMode="clip"
        >
          {name}
        </ThemedText>
      </View>
      <Image
        source={image}
        style={{
          height: "100%",
          aspectRatio: 1,
          borderRadius: 15,
          //   backgroundColor: color,
        }}
        contentPosition={"top center"}
        contentFit="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: -CONTAINER_WIDTH / 8,
    left: -CONTAINER_WIDTH / 1.28,
    width: CONTAINER_WIDTH,
    aspectRatio: 1,
    transformOrigin: "center",
    borderRadius: radius,
  },
  view: {
    position: "absolute",
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});
