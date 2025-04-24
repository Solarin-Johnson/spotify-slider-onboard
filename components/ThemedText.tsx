import { Text, type TextProps, StyleSheet, PixelRatio } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export const FACTOR = PixelRatio.getPixelSizeForLayoutSize(2);
const TITLE_SIZE = 36 + FACTOR;

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={[
        { color, fontFamily: "InterMedium" },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 17,
    fontFamily: "InterSemiBold",
  },
  title: {
    fontSize: TITLE_SIZE,
    lineHeight: TITLE_SIZE,
    fontFamily: "InterSemiBold",
    letterSpacing: -0.6,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "InterRegular",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
});
