import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Artist } from "@/constants/config";
import { Image } from "expo-image";
import { FACTOR, ThemedText } from "./ThemedText";
import Animated, {
  SharedValue,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDecay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Svg, { Line } from "react-native-svg";
import { useThemeColor } from "@/hooks/useThemeColor";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";

const ROTATION_FACTOR = 0.05;
const STOP_ANGLE = 270;
const SPRING_CONFIG = {
  damping: 15,
  stiffness: 120,
};
const RULER_TIMING_CONFIG = {
  duration: 50,
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

const AnimatedLine = Animated.createAnimatedComponent(Line);

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
    <View style={{ flex: 1, justifyContent: "center" }}>
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
      <LinearRuler
        angle={offset}
        totalTicks={Artist.length * 1.2}
        height={CARD_HEIGHT}
      />
    </View>
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

interface RulerProps {
  angle: SharedValue<number>;
  totalTicks?: number;
  width?: number;
  height?: number;
  tickSpacing?: number;
  tickHeight?: number;
  activeHeight?: number;
}

const LinearRuler: React.FC<RulerProps> = ({
  angle,
  totalTicks = 10,
  width = 40,
  height = 360,
  tickSpacing = 4,
  tickHeight = 5,
  activeHeight = 10,
}) => {
  const text = useThemeColor({}, "text");

  const ticks = Array.from({ length: totalTicks }, (_, i) => {
    const factor = FACTOR / 3.5;
    const y = (i + tickSpacing * factor) * tickSpacing;

    const progress = useDerivedValue(() => {
      const threshold = 10;
      const smoothedAngle = Math.abs(angle.value) > threshold ? angle.value : 0;

      return -smoothedAngle / STOP_ANGLE;
    });

    const animatedProps = useAnimatedProps(() => {
      const currentIndex = Math.min(
        Math.max(0, progress.value * totalTicks),
        totalTicks - 1
      );

      const distance = Math.abs(currentIndex - i);
      let height = tickHeight * factor;
      let _activeHeight = activeHeight * factor;

      if (distance < 0.5) height = _activeHeight;
      else if (distance < 1.5) height = _activeHeight * 0.7;

      return {
        x2: withTiming(width - height, RULER_TIMING_CONFIG),
        opacity: withTiming(
          distance < 0.5 ? 1 : distance < 1.5 ? 0.7 : 0.5,
          RULER_TIMING_CONFIG
        ),
      };
    });

    return (
      <AnimatedLine
        key={i}
        x1={width}
        x2={width}
        y1={y}
        y2={y}
        strokeWidth={1.1 * factor}
        stroke={text + "70"}
        animatedProps={animatedProps}
      />
    );
  });
  return (
    <Svg width={width} height={height} style={styles.progressContainer}>
      {ticks}
    </Svg>
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
  progressContainer: {
    position: "absolute",
    right: 10,
    top: CONTAINER_WIDTH / 4 + CARD_HEIGHT / 2,
  },
});
